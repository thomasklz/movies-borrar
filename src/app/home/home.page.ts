import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { MoviesService } from '../servicios/movies.service';
import { RouterLink } from '@angular/router';

import { addIcons } from 'ionicons';
import { homeOutline, playCircle, radio, search } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [  RouterLink,IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private moviesService = inject(MoviesService);
  searchResults: any[] = [];

  constructor() {
    addIcons({ homeOutline, playCircle, radio, search });
  }


  searchMovies(nombre:any) {
    this.moviesService.searchMovies(nombre.value).subscribe({
      next: (datos:any) => {
        this.searchResults = datos.results;
      },
      error: (error:any) => {
        debugger
      }
    })

  }

}
