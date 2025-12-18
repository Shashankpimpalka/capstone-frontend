import { Component } from '@angular/core';
import { AuthService } from '../services/guard/auth.service';


@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css'],
    standalone: false
})
export class TopBarComponent {
  title = 'Expense Manager';
  isUserLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
     let storeData = localStorage.getItem("isUserLoggedIn");
     console.log("StoreData: " + storeData);

     if( storeData != null && storeData == "true")
        this.isUserLoggedIn = true;
     else
        this.isUserLoggedIn = false;
  }

}
