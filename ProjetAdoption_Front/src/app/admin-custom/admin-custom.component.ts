import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SpeciesService} from '../shared/services/species.service';
import {RaceService} from '../shared/services/race.service';
import {CharacterService} from '../shared/services/character.service';
import {ISpecies} from '../shared/interfaces/species.interface';
import {IRace} from '../shared/interfaces/race.interface';
import {ICharacter} from '../shared/interfaces/characte.interface';

@Component({
  selector: 'app-admin-custom',
  templateUrl: './admin-custom.component.html',
  styleUrls: ['./admin-custom.component.scss']
})
export class AdminCustomComponent implements OnInit {
  formSpecies: any;
  formSepecifications: any;
  formRace: any;
  species: ISpecies[];
  races: IRace[];
  characters: ICharacter[];
  defaultSpecies = 'default';
  defaultRace = 'default';
  defaultChara = 'default';
  selectedSpecies: boolean;
  selectedRace: boolean;
  selectedChara: boolean;

  constructor(private formBuilder: FormBuilder,
              private speciesService: SpeciesService,
              private raceService: RaceService,
              private characterService: CharacterService
  ) {
    this.formSpecies = this.formBuilder.group({
      newSpecie: [],
      selectedSpecie: [],
      valueSpecie: [],
    });
    this.formRace = this.formBuilder.group({
      newRace: [],
      selectedRace: [],
      valueRace: [],
    });
    this.formSepecifications = this.formBuilder.group({
      newChara: [],
      selectedChara: [],
      valueChara: [],
    });
  }

  ngOnInit(): void {
    this.selectedSpecies = false;
    this.selectedRace = false;
    this.selectedChara = false;
    this.getSpecies();
  }

  createSpecie() {
    this.speciesService.toCreate({
      nom_espece: this.formSpecies.value.newSpecie
    }).subscribe(
      data => {
        this.getSpecies();
        this.formSpecies.controls['newSpecie'].setValue('');
      },
      err => {
        console.log(err);
      }
    );
  }

  updateSpecie() {
    console.log(this.formSpecies.value.valueSpecie);
    this.speciesService.toUpdate({
      id_espece: this.formSpecies.value.selectedSpecie,
      nom_espece: this.formSpecies.value.valueSpecie
    }).subscribe(
      data => {
        this.getSpecies();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteSpecie() {
    this.speciesService.toDelete(this.formSpecies.value.selectedSpecie).subscribe(
      data => {
        this.getSpecies();
        this.defaultSpecies = 'default';
        this.selectedSpecies = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  createRace() {
    this.raceService.toCreate({
      idEspece: this.formSpecies.value.selectedSpecie,
      nom_race: this.formRace.value.newRace
    }).subscribe(
      data => {
        this.getRaces();
        this.formRace.controls['newRace'].setValue('');
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRace() {
    this.raceService.toUpdate({
      id_race: this.formRace.value.selectedRace,
      nom_race: this.formRace.value.valueRace
    }).subscribe(
      data => {
        this.getRaces();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteRace() {
    this.raceService.toDelete(this.formRace.value.selectedRace).subscribe(
      data => {
        this.getRaces();
        this.formRace.controls['valueRace'].setValue('');
        this.defaultRace = 'default';
      },
      err => {
        console.log(err);
      }
    );
  }

  createChara() {
    this.characterService.toCreate({
      idEspece: this.formSpecies.value.selectedSpecie,
      nom_caracteristique: this.formSepecifications.value.newChara
    }).subscribe(
      data => {
        this.getChara();
        this.formSepecifications.controls['newChara'].setValue('');
      },
      err => {
        console.log(err);
      }
    );
  }

  updateChara() {
    this.characterService.toUpdate({
      id_caracteristique: this.formSepecifications.value.selectedChara,
      nom_caracteristique: this.formSepecifications.value.valueChara
    }).subscribe(
      data => {
        this.getChara();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteChara() {
    this.characterService.toDelete(this.formSepecifications.value.selectedChara).subscribe(
      data => {
        this.getChara();
        this.formSepecifications.controls['valueChara'].setValue('');
        this.defaultChara = 'default';
      },
      err => {
        console.log(err);
      }
    );
  }

  selectSpecies() {
    if (this.formSpecies.value.selectedSpecie !== 'default') {
      this.selectedSpecies = true;
      this.formSpecies.controls['valueSpecie'].setValue(
        this.species.find(specie => specie.id_espece === +this.formSpecies.value.selectedSpecie).nom_espece);
      this.getRaces();
      this.getChara();
      this.defaultSpecies = 'default';
      this.defaultRace = 'default';
      this.defaultChara = 'default';
      this.formRace.controls['valueRace'].setValue('');
      this.formSepecifications.controls['valueChara'].setValue('');
    } else {
      this.selectedSpecies = false;
    }
  }

  selectRace() {
    if (this.formRace.value.selectedRace !== 'default') {
      this.selectedRace = true;
      this.formRace.controls['valueRace'].setValue(
        this.races.find(race => race.id_race === +this.formRace.value.selectedRace).nom_race);
    } else {
      this.selectedRace = false;
    }
  }

  selectChara() {
    if (this.formSepecifications.value.selectedChara !== 'default') {
      console.log(this.formSepecifications.value.selectedChara);
      this.selectedChara = true;
      this.formSepecifications.controls['valueChara'].setValue(
        this.characters.find(chara => chara.id_caracteristique === +this.formSepecifications.value.selectedChara).nom_caracteristique);
    } else {
      this.selectedChara = false;
    }
  }

  getSpecies() {
    this.speciesService.getAll().subscribe(
      data => {
        this.species = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getRaces() {
    this.raceService.getAll(+this.formSpecies.value.selectedSpecie).subscribe(
      data => {
        this.races = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getChara() {
    this.characterService.getAll(+this.formSpecies.value.selectedSpecie).subscribe(
      data => {
        this.characters = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
