import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteDataService} from '../shared/services/site-data.service';
import {SpeciesService} from '../shared/services/species.service';
import {ISpecies} from '../shared/interfaces/species.interface';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit {
  title = 'Catégorie';
  species: ISpecies[];
  isLoading: any;
  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private siteDataService: SiteDataService,
    private speciesService: SpeciesService
  ) {
    this.siteDataService.changeTitle(titleService, route);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.speciesService.getAll().subscribe(
        data => {
          this.species = data;
          this.isLoading = false;
          console.log(data);
        },
        err => {
          console.log(err);
    }
    );
  }

  toAnimalList(specieId: number, nbrAnimalEspece: number) {
    if (nbrAnimalEspece > 0) {
      this.router.navigate(['/liste-animaux', specieId]);
    }
  }

  addPlural(specie: ISpecies) {
    if (specie.nbrAnimalEspece > 1) {
      return specie.nom_espece + 's' + ' disponibles';
    }
    return specie.nom_espece  + ' disponible';
  }
}
