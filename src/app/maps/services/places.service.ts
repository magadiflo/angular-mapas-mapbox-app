import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number]; //* ?, será opcional

  public get isUserLocationReady(): boolean {
    return !!this.userLocation; //* Solo es doble negación
  }

  constructor() {
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

}
