import { Component } from '@angular/core';
import { AuthService } from '../services/guard/auth.service';
import { NavigationEnd, Router } from '@angular/router';


@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css'],
    standalone: false
})
export class TopBarComponent {
  title = 'Expense Manager';
  isUserLoggedIn = false;
  isChatPage = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

   this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
      {this.isChatPage = event.urlAfterRedirects === '/chat';}
    });
     let storeData = localStorage.getItem("isUserLoggedIn");
     console.log("StoreData: " + storeData);

     if( storeData != null && storeData == "true")
        this.isUserLoggedIn = true;
     else
        this.isUserLoggedIn = false;
  }

}
