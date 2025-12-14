import { Component, OnInit } from '@angular/core';
import { Actor } from '../../actor';
import { ActorService } from '../../services/actor.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router'


@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  actors: any;

  constructor(private actorservice: ActorService,
    private router: Router) { }

  ngOnInit() {
    this.getActors();
  }

  private getActors() {
    this.actorservice.getActorsList().subscribe(
      data => {
        console.log(data);
        this.actors = data;
      });
  }

  deleteActor(actorId:number){
    this.actorservice.deleteActor(actorId).subscribe(
      data=>{
        console.log(data);
        this.getActors();
      }
    )
  }

  updateActor(actorId:number){
    this.router.navigate(['updateactor',actorId]);
  }


}
