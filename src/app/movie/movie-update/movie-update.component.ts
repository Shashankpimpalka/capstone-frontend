import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movie-update',
    templateUrl: './movie-update.component.html',
    styleUrls: ['./movie-update.component.css'],
    standalone: false
})
export class MovieUpdateComponent implements OnInit {

  movieId!:number;
  movie:any;


  constructor(private movieService:MovieService,
    private route:ActivatedRoute,
    private router:Router
    ){}

  ngOnInit(): void {
    this.movie=new Movie();
    this.movieId = this.route.snapshot.params['movieId'];
    this.movieService.getMovieById(this.movieId).subscribe(
    {
      next: (data) => { 
        this.movie=data;
        console.log(data);      
      },
      error: (error)=> {console.log(error)}
    }
    );
  }

  updateMovie(){
    this.movieService.updateMovie(this.movie).subscribe(
      {
        next:(data)=>{console.log(data);
          this.goToMovieList();
        },
        error:(error)=>{console.log(error)}
      }
    )
  }

  goToMovieList(){
    this.router.navigate(['/movie'])
  }

  onSubmit(){
    console.log(this.movie);
    this.updateMovie();
  }

}
