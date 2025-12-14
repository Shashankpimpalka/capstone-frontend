import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/actor';
import { ActorService } from 'src/app/services/actor.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-actor-update',
  templateUrl: './actor-update.component.html',
  styleUrls: ['./actor-update.component.css']
})
export class ActorUpdateComponent implements OnInit {

  actorId!: number;
  actor: any;


  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actorId = this.route.snapshot.params['actorId'];
    this.actorService.getActorById(this.actorId).subscribe(
      {
        next: (data) => {
          this.actor = data;
          console.log(data);
        },
        error: (error) => console.log(error)
      }
    );
}



  onSubmit() {
    console.log(this.actor)
    this.actorService.updateActor(this.actor).subscribe(
      {
      next:(data)=>{console.log(data); 
        this.goToActorList();
      },
      error: (error) => console.log(error)
    }
      );
  }


  goToActorList() {
    this.router.navigate(['/actor'])
  }

  

}
