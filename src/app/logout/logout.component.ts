import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/guard/auth.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
    standalone: false
})
export class LogoutComponent {

  constructor(private authService : AuthService, private router: Router) { }

   ngOnInit() {
      this.authService.logout();
      this.router.navigate(['/']);
   }


}
