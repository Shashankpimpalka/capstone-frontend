import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit{

  movie:Movie=new Movie;

  constructor(private router:Router,
    private movieService:MovieService){

  }

  createMovie(){
    console.log(this.movie);
    this.movieService.saveMovie(this.movie).subscribe(
      {
        next:(data)=>{
          console.log(data);
          this.goToMovieList();
        }
      }
    )

  }

  goToMovieList(){
    this.router.navigate(['/movie'])
  }


  ngOnInit(): void {
    
    
  }

  saveMovieOnClick(){
    console.log(this.movie)
    this.createMovie();
  }


}
