import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonAPIService {

 

  constructor(  
    private http: HttpClient,
  ) { }

  baseUrl: string = 'https://pokeapi.co/api/v2'; 
  endpoint: string = 'https://pokeapi.co/api/v2/type/';

  /** GET pokemon from the server */
  searchPokemon(type: string): Observable<any> {
    return this.http.get<any>(this.endpoint + type);
  }

  grabPokemonDetails(pokemon: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/pokemon/' + pokemon);
  }

}
