import { Component, OnInit } from '@angular/core';
import { PokemonAPIService } from '../pokemon-api.service';
import { UserSelectService } from '../services/user-select.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(private pokemonAPIService: PokemonAPIService, public userSelectService: UserSelectService) {}

  ngOnInit(): void {
    this.getPokemon();
  }


  waterPokemon: any[] = [];
  waterSprites: string[] = [];
  waterId: string[] = [];
  waterNames: string[] = [];
  waterDetails: any [] = [];

  getPokemon() {
    this.waterPokemon = [];
    this.waterSprites = [];
    this.waterId = [];
    this.waterNames = [];
    this.waterDetails = [];
    this.pokemonAPIService.searchPokemon('water').subscribe(
      (res : any) => {
        for (let pokemon of res.pokemon) {
          this.waterPokemon.push(pokemon.pokemon);
        }
        //grab pokemon names
       for (let pokemon of this.waterPokemon) {
          this.waterNames.push(pokemon.name);
        }
        //grab pokemon deatils
        for (let pokemon of this.waterNames) {
          this.pokemonAPIService.grabPokemonDetails(pokemon).subscribe(
            (res : any) => {
              this.waterSprites.push(res.sprites.front_default);
              this.waterId.push(res.id);
              this.waterDetails.push( {
                name: res.name.charAt(0).toUpperCase() + res.name.slice(1),
                id: res.id,
                sprites: res.sprites,
              });
            }
          )
        }
        
      // console.log(this.waterPokemon);
      // console.log(this.waterSprites);
      // console.log(this.waterDetails);
    });
  } 

  waterPokemonSelect(type: 'water', pokemonName: string, pokemonSprite: string, pokemonId: string) {
    this.userSelectService.pokemonSelected(type, pokemonName, pokemonSprite, pokemonId);
    console.log(this.userSelectService.usersWaterPokemon);
    console.log(this.userSelectService.usersWaterPokemonSprite);
  }

  clearPokemon() {
    this.userSelectService.clearPokemon('water');
  }

}
