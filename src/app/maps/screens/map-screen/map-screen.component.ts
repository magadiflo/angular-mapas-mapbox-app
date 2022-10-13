import { Component } from '@angular/core';

//* Importando del archivo index.ts que es el archivo principal del directorio /services
import { PlacesService } from '../../services';


@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent {

  get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }


  constructor(private placesService: PlacesService) { }



}
