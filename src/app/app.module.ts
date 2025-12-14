import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GuardsCheckEnd, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ActorsComponent } from './actor/actors-list/actors.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin-list/admin.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { CreateMovieComponent } from './movie/movie-create/create-movie.component';
import { ReviewListComponent } from './review/review-list/review-list.component';
import { CreateReviewComponent } from './review/review-create/create-review.component';
import { ActorUpdateComponent } from './actor/actor-update/actor-update.component';
import { AtorCreateComponent } from './actor/actor-create/actor-create.component';
import { MovieUpdateComponent } from './movie/movie-update/movie-update.component';
import { ReviewUpdateComponent } from './review/review-update/review-update.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './services/guard/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ActorsComponent,
    TopBarComponent,
    AdminComponent,
    CreateAdminComponent,
    MovieListComponent,
    CreateMovieComponent,
    ReviewListComponent,
    CreateReviewComponent,
    ActorUpdateComponent,
    AtorCreateComponent,
    MovieUpdateComponent,
    ReviewUpdateComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'actor', component: ActorsComponent,canActivate:[AuthGuard]  },
      { path: 'admin', component: AdminComponent,canActivate:[AuthGuard]  },
      { path: 'review', component: ReviewListComponent,canActivate:[AuthGuard]  },
      { path: 'movie', component: MovieListComponent,canActivate:[AuthGuard] },
      { path: 'createadmin', component: CreateAdminComponent,canActivate:[AuthGuard]  },
      { path: 'createmovie', component: CreateMovieComponent,canActivate:[AuthGuard]  },
      { path: 'createactor', component: AtorCreateComponent,canActivate:[AuthGuard]   },
      { path: 'createreview/:movieId', component: CreateReviewComponent,canActivate:[AuthGuard]  },
      { path: 'updatemovie/:movieId', component: MovieUpdateComponent,canActivate:[AuthGuard]   },  
      { path: 'updatereview/:reviewId', component: ReviewUpdateComponent,canActivate:[AuthGuard] },
      { path: 'updateactor/:actorId', component: ActorUpdateComponent,canActivate:[AuthGuard]  },
      { path: '', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
      {path : 'logout', component: LogoutComponent}
      
    
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
