import { Component, OnInit } from '@angular/core';
import { PokemonAPIService } from '../pokemon-api.service';
import { UserSelectService } from '../services/user-select.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private pokemonAPIService: PokemonAPIService, public userSelectService: UserSelectService) {}
  
  ngOnInit(): void {
    this.getPokemon();
  }
  
  
  firePokemon: any[] = [];
  fireSprites: string[] = [];
  fireId: string[] = [];
  fireNames: string[] = [];
  fireDetails: any [] = [];

  getPokemon() {
    this.firePokemon = [];
    this.fireSprites = [];
    this.fireId = [];
    this.fireNames = [];
    this.fireDetails = [];
    this.pokemonAPIService.searchPokemon('fire').subscribe(
      (res : any) => {
        for (let pokemon of res.pokemon) {
          this.firePokemon.push(pokemon.pokemon);
        }
        //grab pokemon names
       for (let pokemon of this.firePokemon) {
          this.fireNames.push(pokemon.name);
        }
        //grab pokemon deatils
        for (let pokemon of this.fireNames) {
          this.pokemonAPIService.grabPokemonDetails(pokemon).subscribe(
            (res : any) => {
              this.fireSprites.push(res.sprites.front_default);
              this.fireId.push(res.id);
              this.fireDetails.push( {
                name: res.name.charAt(0).toUpperCase() + res.name.slice(1),
                id: res.id,
                sprites: res.sprites,
              });
            }
          )
        }
        
      // console.log(this.firePokemon);
      // console.log(this.fireSprites);
      // console.log(this.fireDetails);
    });
  }  

  firePokemonSelect(type: 'fire', pokemonName: string, pokemonSprite: string, pokemonId: string) {
    this.userSelectService.pokemonSelected(type, pokemonName, pokemonSprite, pokemonId);
    // console.log(this.userSelectService.usersFirePokemon);
    // console.log(this.userSelectService.usersFirePokemonSprite);
    // console.log(this.userSelectService.usersFirePokemonId);
  }

  clearPokemon() {
    this.userSelectService.clearPokemon('fire');
  }


}
