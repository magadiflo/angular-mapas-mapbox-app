import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PlacesResponse, Feature } from '../interfaces/places.interfaces';

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

  constructor(private http: HttpClient) {
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
    this.isLoadingPlaces = true;
    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-78.52182114141876%2C-9.134842843283124&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoibWFnYWRpZmxvIiwiYSI6ImNrcTdpbzNpajA0dTYydnM0cjRvMXNtMXkifQ.2dODZhXZVBjGBLQUkIV_Ww`)
      .subscribe(resp => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
  }

}
