import { Injectable } from '@angular/core';

import { PlacesResponse, Feature } from '../interfaces/places.interfaces';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

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

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService) {
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
    if (query.trim().length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if (!this.userLocation) throw new Error('No hay userLocation');

    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, { params: { proximity: this.userLocation.join(',') } })
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
      });
  }

  deletePlaces() {
    this.places = [];
  }

}
