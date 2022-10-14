import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Map, Popup, Marker } from 'mapbox-gl';

import { PlacesService, MapService } from '../../services';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(
    private placeService: PlacesService,
    private mapService: MapService) { }

  ngAfterViewInit(): void {
    if (!this.placeService.userLocation) throw new Error("No hay placesServices.userLocation");

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placeService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);

    new Marker({ color: 'red' })
      .setLngLat(this.placeService.userLocation)
      .setPopup(popup)
      .addTo(map);

    //*De esta manera tendremos acceso global al mapa
    this.mapService.setMap(map);
  }

}
