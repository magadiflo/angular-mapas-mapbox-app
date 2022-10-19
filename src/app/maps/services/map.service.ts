import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map; //* ?, que es opcional
  private markers: Marker[] = [];

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw new Error('El mapa no está inicializado!');

    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });

  }

  createMarkersFromPlaces(places: Feature[]) {
    if (!this.map) throw new Error('Mapa no inicializado');
    this.markers.forEach(marker => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${place.text}</h6>
          <span>${place.place_name}</span>
        `);
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;
  }

}
