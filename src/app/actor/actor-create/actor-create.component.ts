import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/actor';
import { ActorService } from 'src/app/services/actor.service';

@Component({
    selector: 'app-ator-create',
    templateUrl: './actor-create.component.html',
    styleUrls: ['./actor-create.component.css'],
    standalone: false
})
export class AtorCreateComponent implements OnInit{

  actor:Actor =new Actor();

  constructor(private actorService:ActorService,
    private router:Router){
    }

    saveActor(){
      this.actorService.createActor(this.actor).subscribe(
        {
          next:(data)=>{
            console.log(data);
            this.goToActorList()},
          }
        )
      }
    

    ngOnInit(): void {
      
    }

    goToActorList(){
      this.router.navigate(['/actor'])
    }

    saveActorOnClick(){
      console.log(this.actor);
      this.saveActor();
    }



}
