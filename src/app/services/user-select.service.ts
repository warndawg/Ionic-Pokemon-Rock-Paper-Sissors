import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSelectService {

  constructor() { }

  usersFirePokemon: any;
  usersFirePokemonSprite: any;
  usersFirePokemonId: any;
  usersWaterPokemon: any;
  usersWaterPokemonSprite: any;
  usersWaterPokemonId: any;
  usersGrassPokemon: any;
  usersGrassPokemonSprite: any;
  usersGrassPokemonId: any;
  computersFirePokemon: 'charmander';
  computersWaterPokemon: 'squirtle';
  computersGrassPokemon: 'bulbasaur';

  pokemonSelected(type: string, pokemonName: string, pokemonSprite: string, pokemonId: string) {
    if (type === 'fire') {
      this.usersFirePokemon = pokemonName;
      this.usersFirePokemonSprite = pokemonSprite;
      this.usersFirePokemonId = pokemonId;
    } else if (type === 'water') {
      this.usersWaterPokemon = pokemonName;
      this.usersWaterPokemonSprite = pokemonSprite;
      this.usersWaterPokemonId = pokemonId;
    } else if (type === 'grass') {
      this.usersGrassPokemon = pokemonName;
      this.usersGrassPokemonSprite = pokemonSprite;
      this.usersGrassPokemonId = pokemonId;
    }
  }

  clearPokemon(type) {
    if (type === 'fire') {
      this.usersFirePokemon = null;
      this.usersFirePokemonSprite = null;
      this.usersFirePokemonId = null;
    } else if (type === 'water') {
      this.usersWaterPokemon = null;
      this.usersWaterPokemonSprite = null;
      this.usersWaterPokemonId = null;
    } else if (type === 'grass') {
      this.usersGrassPokemon = null;
      this.usersGrassPokemonSprite = null;
      this.usersGrassPokemonId = null;
    }
  }

  
}
