import { Injectable } from '@angular/core';

import { PlacesResponse, Feature } from '../interfaces/places.interfaces';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number]; //* ?, será opcional

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  public get isUserLocationReady(): boolean {
    return !!this.userLocation; //* Solo es doble negación
  }

  constructor(private placesApi: PlacesApiClient) {
    this.getUserLocation();
  }

  //* Se obtiene la geolocalización del usuario
  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    // TODO: evaluar cuando el query es un string vacío
    if (!this.userLocation) throw new Error('No hay userLocation');

    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, { params: { proximity: this.userLocation.join(',') } })
      .subscribe(resp => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
  }

}
