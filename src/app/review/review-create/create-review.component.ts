import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from 'src/app/movie'; 
import { Review } from 'src/app/review';
import { ActorService } from 'src/app/services/actor.service'; 
import { MovieService } from 'src/app/services/movie.service'; 
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {


  movies!:Movie[];
  movie:Movie=new Movie;
  review:Review=new Review;
  formGroup !: FormGroup;
    date:any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private reviewService: ReviewService,
        private movieService: MovieService
    ) { }

    ngOnInit():void {
      this.date = new Date().toISOString().slice(0, 10); 
      this.review.movieId=this.route.snapshot.params['movieId']; 

      this.review.adminId!=localStorage.getItem('userName');
      console.log(this.review.adminId);

    }

    // convenience getter for easy access to form fields
    get f() { return this.formGroup.controls; }

    

    onSubmit() {
      console.log(this.movie);
      console.log(this.review)
      this.reviewService.saveReview(this.review).subscribe(
        {
          next:(data)=>{
            console.log(data);
            alert("review added "+data);
            this.goToMovieList();

          }
        }
      )
       
        }

        goToMovieList(){
          this.router.navigate(['/movie'])
        }


}
