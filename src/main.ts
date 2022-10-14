import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


import Mapboxgl from 'mapbox-gl';
Mapboxgl.accessToken = 'pk.eyJ1IjoibWFnYWRpZmxvIiwiYSI6ImNsOTd3eXQ5MjFpZWEzdnFtejIwcnoyYXEifQ.O4Ibb1y6AxnPCTWw3XdPTw';

//* Si el navegador donde se desplega no soporta la geolocalización, pues no hacemos nada, hasta allí llegamos -----
if (!navigator.geolocation) {
  alert('Navegador no soporta la Geolocation');
  throw new Error('Navegador no soporta la Geolocation');
}
//* ----------------------------------------------------------------------------------------------------------------

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
