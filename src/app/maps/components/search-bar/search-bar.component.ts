import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  /**
   * * NodeJS.Timeout, viene en javascript, pero para usarlo en este proyecto hubo que 
   * * modificar dos archivos: tsconfig.app.json y el tsconfig.json agregando
   * * "types": [
   * *    "node"
   * *  ]
   * * Luego para que establezca los cambios bajar y subir la aplicación
   */
  private debounceTime?: NodeJS.Timeout;

  constructor(private placesService: PlacesService) { }

  onQueryChanged(query: string = '') {
    /**
     * * Cada vez que escribamos algo, se ejecutará este método onQueryChanged(...),
     * * y como al this.debounceTime se le establece el setTimeout de 1 segundo, el 
     * * if valida que ya tiene un debounceTime y lo limpia, eso ocurrirá siempre
     * * que estemos tecleando continuamente. Ahora, cuando dejemos de teclear después
     * * de 1 segundo es que recién se ejecutará el código dentro del setTimeout
     * * 
     */
    if (this.debounceTime) clearTimeout(this.debounceTime);

    this.debounceTime = setTimeout(() => {
      this.placesService.getPlacesByQuery(query);
    }, 1000);
  }

}
