import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private http = inject(HttpClient);
  
  constructor() { }

  searchMovies(nombre:string) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=43bb95cae941badc90476b9f10f04134&query=${nombre}&include_adult=false&language=en-US&page=1` );
  }

  getMovieDetails(codeMovie:string) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${codeMovie}?api_key=43bb95cae941badc90476b9f10f04134&language=en-US` );
  }
}
