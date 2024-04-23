import { Component, OnInit } from '@angular/core';
import { UserSelectService } from '../services/user-select.service';
import { PokemonAPIService } from '../pokemon-api.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public userSelectService: UserSelectService, private pokemonAPIService: PokemonAPIService) { }

  ngOnInit() {
    this.getComputersPokemonDetails(this.computersPokemon);
    console.log(this.computersPokemonDetails);
  } 

  selectedPokemon: any[] = [];
  selectedPokemonType: string;
  computersPokemonDetails: any[] = [];
  computersPokemonType: string;
  computersPokemon = this.randomPokemon();
  results = null;

  getSelectedPokemonDetails(pokemon, type) {
    this.selectedPokemon = [];
    this.pokemonAPIService.grabPokemonDetails(pokemon).subscribe(
      (res : any) => {
        this.selectedPokemon.push( {
          name: res.name.charAt(0).toUpperCase() + res.name.slice(1),
          id: res.id,
          sprites: res.sprites,
          type: res.types[0].type.name
        });
        this.selectedPokemonType = type;
      })
      console.log(this.selectedPokemon);
  }

  getComputersPokemonDetails(pokemon) {
    this.computersPokemonDetails = [];
    this.pokemonAPIService.grabPokemonDetails(pokemon).subscribe(
      (res : any) => {
        this.computersPokemonDetails.push( {
          name: res.name.charAt(0).toUpperCase() + res.name.slice(1),
          id: res.id,
          sprites: res.sprites,
          type: res.types[0].type.name
        });
        this.computersPokemonType = res.types[0].type.name;
      })
      console.log(this.computersPokemonDetails);
  }

  randomPokemon() {
    let pokemon = ['charmander', 'squirtle', 'bulbasaur'];
    let random = Math.floor(Math.random() * pokemon.length);
    return pokemon[random];
  }

  findWinner(userPokemon, computerPokemon) {
    this.results = '';
    console.log(userPokemon, computerPokemon);
    if (userPokemon === "fire" && computerPokemon === 'grass' 
    || userPokemon === 'water' && computerPokemon === 'fire' 
    || userPokemon === 'grass' && computerPokemon === 'water') {
      this.results = 'You Win!';
    } else if (userPokemon === 'fire' && computerPokemon === 'water' || 
    userPokemon === 'water' && computerPokemon === 'grass' ||
    userPokemon === 'grass' && computerPokemon === 'fire') {
      this.results = 'You Loose!';
    } else if (userPokemon === computerPokemon){
      this.results = 'Draw!';
    }
  }

  playAgain() {
    this.computersPokemon = this.randomPokemon();
    this.getComputersPokemonDetails(this.computersPokemon);
    this.selectedPokemonType = null;
    this.results = null;
  }
    
  
}



