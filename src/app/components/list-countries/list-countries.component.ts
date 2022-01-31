import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/region';
import { Country } from 'src/app/models/country';
import { forkJoin } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { differenceBy } from 'lodash-es';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {

  // Atributos
  public listRegions: Region[];
  public listCountries: Country[];
  public listCountriesToVisit: Country[];
  public regionSelected: string;
  public load: boolean;

  public markers: any[];
  public lat: number;
  public lng: number;
  public zoom: number;

  constructor(private countryService: CountryService) {
    this.load = false;
    this.listRegions = [];
    this.listCountries = [];
    this.listCountriesToVisit = [];
    this.regionSelected = 'EU';
    this.markers = [];
    this.lat = 0;
    this.lng = 0;
    this.zoom = 2;
  }

  ngOnInit() {
    // Espero a que me devuelva los datos de los dos observables (regiones y paises de EU)
    forkJoin(
      this.countryService.getCountriesByRegion("eu"),
      this.countryService.getAllRegions()
    ).subscribe(results => {
      // posicion 0 = paises, posicion 1 = regiones
      this.listCountries = results[0];
      this.listRegions = results[1];
      this.load = true;

    }, error => {
      console.error('Error: ' + error);
      this.load = true;
    })
  }

  /**
   * Filtro los paises segun la region
   * @param $event region donde buscar
   */
   filterCountries($event: { value: string; }) {
    this.load = false;
    this.countryService.getCountriesByRegion($event.value).subscribe(list => {
      // Saco la diferencia de la lista que me viene y la lista a visitar
      this.listCountries = differenceBy(list, this.listCountriesToVisit, c => c.name);
      this.load = true;
    })

  }

  /**
   * Evento cuando hacemos el drag anddrop
   * @param event Elemento movido
   */
   drop(event: CdkDragDrop<Country[]>) {
    // Si se mueve dentro de la misma bloque, lo muevo dentro del contenedor
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Sino lo paso al otro contenedor
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      if (event.container.id === "visit") {
        // añadir marcador
        let c = event.container.data[event.currentIndex];
        this.markers.push({
          position: {
            lat: c.latlng[0],
            lng: c.latlng[1],
          },
          label: {
            color: 'black',
            text: c.name
          }
        });
      } else {
        // eliminar marcador
        let c = event.container.data[event.currentIndex];

        let index = this.markers.findIndex(m => m.label.text === c.name);

        this.markers.splice(index, 1);

      }
    }
  }

}


