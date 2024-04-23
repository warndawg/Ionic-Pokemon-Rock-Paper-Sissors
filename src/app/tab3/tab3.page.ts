import { Component, OnInit } from '@angular/core';
import { PokemonAPIService } from '../pokemon-api.service';
import { UserSelectService } from '../services/user-select.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private pokemonAPIService: PokemonAPIService, public userSelectService: UserSelectService) {}

  ngOnInit(): void {
    this.getPokemon();
  }


  grassPokemon: any[] = [];
  grassSprites: string[] = [];
  grassId: string[] = [];
  grassNames: string[] = [];
  grassDetails: any [] = [];

  getPokemon() {
    this.grassPokemon = [];
    this.grassSprites = [];
    this.grassId = [];
    this.grassNames = [];
    this.grassDetails = [];
    this.pokemonAPIService.searchPokemon('grass').subscribe(
      (res : any) => {
        for (let pokemon of res.pokemon) {
          this.grassPokemon.push(pokemon.pokemon);
        }
        //grab pokemon names
       for (let pokemon of this.grassPokemon) {
          this.grassNames.push(pokemon.name);
        }
        //grab pokemon deatils
        for (let pokemon of this.grassNames) {
          this.pokemonAPIService.grabPokemonDetails(pokemon).subscribe(
            (res : any) => {
              this.grassSprites.push(res.sprites.front_default);
              this.grassId.push(res.id);
              this.grassDetails.push( {
                name: res.name.charAt(0).toUpperCase() + res.name.slice(1),
                id: res.id,
                sprites: res.sprites,
              });
            }
          )
        }
        
      // console.log(this.grassPokemon);
      // console.log(this.grassSprites);
      // console.log(this.grassDetails);
    });
  }
  
  grassPokemonSelect(type: 'grass', pokemonName: string, pokemonSprite: string, pokemonId: string) {
    this.userSelectService.pokemonSelected(type, pokemonName, pokemonSprite, pokemonId);
    console.log(this.userSelectService.usersGrassPokemon);
    console.log(this.userSelectService.usersGrassPokemonSprite);
  }

  clearPokemon() {
    this.userSelectService.clearPokemon('grass');
  }

}
