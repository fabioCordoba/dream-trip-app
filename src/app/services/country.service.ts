import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICountry } from '../interfaces/icountry';
import { IRegion } from '../interfaces/iregion';
import { Country } from '../models/country';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  /**
     * Obtengo los paises de una region
     * @param region region de los paises
     */
   getCountriesByRegion(region: string): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('https://restcountries.com/v2/regionalbloc/' + region).pipe(
      map(data => data.map(d => new Country(d)))
    )
  }
  
  /**
     * Obtengo todas las regiones del fichero json
     */
   getAllRegions(): Observable<IRegion[]>{
    return this.http.get<IRegion[]>('assets/data/regions.json').pipe(
      map(data => data.map(d => new Region(d)))
    )
  }

}
