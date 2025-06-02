import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MoviesService } from '../servicios/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailPage implements OnInit {

 private serviceMovies = inject(MoviesService);
 private activatedRoute = inject(ActivatedRoute);
  idMovie !: string;
  detailsMovie !: any;
  constructor() {
    this.idMovie = this.activatedRoute.snapshot.paramMap.get('id')?.toString()!;
   }

  ngOnInit() {
    this.getMovieDetails(this.idMovie);
  }

  getMovieDetails(codeMovie:string) {
    this.serviceMovies.getMovieDetails(codeMovie).subscribe({
      next: (datos:any) => {
        this.detailsMovie = datos;
        console.log(datos);
      },
      error: (error:any) => {
        console.error(error);
      }
    })
  }

}
