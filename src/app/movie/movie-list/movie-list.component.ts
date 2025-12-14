import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/movie';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
 
  movies!: Movie[];
  isUserLoggedIn = false
  movieTitle: string = '';

  constructor(private movieService: MovieService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies() {
    this.movieService.getMovieList().subscribe(
      data => { this.movies = data }
    );
  }
  searchMovies() {

    this.movieService.serchMovie(this.movieTitle).subscribe(
      data => {
        console.log(data);
        this.movies = data
      });

  }

  deleteMovie(movieId: number) {
    this.movieService.deleteMovie(movieId).subscribe(
      data => {
        console.log(data);
        this.getMovies();
      }
    );
  }

  updateMovie(movieId: number) {
    this.router.navigate(['updatemovie', movieId])
  }

  addREview(movieId: number) {
    this.router.navigate(['createreview', movieId])
  }
  

}
