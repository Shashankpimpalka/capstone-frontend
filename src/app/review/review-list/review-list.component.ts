import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.css'],
    standalone: false
})
export class ReviewListComponent implements OnInit {

  reviews!:Review[];

  constructor(private router:Router,
    private reviewService:ReviewService ){}

    ngOnInit(): void {
      this.getReview();
    }
  
    private getReview(){
      this.reviewService.getReviewList().subscribe(
        data=>{this.reviews=data}
      );
    }

  private getReviews(){
    this.reviewService.getReviewList().subscribe(
      data=>{this.reviews=data}
    );
  }

  updateReview(reviewId:number){
this.router.navigate(['review'])
  }

  deleteReview(reviewId:number){
    this.reviewService.deleteReview(reviewId).subscribe(
    data =>{
      console.log(data);
      this.getReviews();
    }
    )

  }

}
