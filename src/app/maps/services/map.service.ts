import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
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

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
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
    if (places.length === 0) return;

    //* Límites del mapa
    const bounds = new LngLatBounds();
    bounds.extend(userLocation); //* Que también se considere nuestra posición para poder ajustar los marcadores a la pantalla
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));

    this.map.fitBounds(bounds, { padding: 200 });
  }

}
