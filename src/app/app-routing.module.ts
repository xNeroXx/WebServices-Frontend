import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent} from "./components/signup/signup.component";
import {PreSearchComponent} from "./components/pre-search/pre-search.component";
import {SearchResultsComponent} from "./components/search-results/search-results.component";
import {authGuard} from "./classes/AuthGuard";
import {MusicComponent} from "./components/music/music.component";

const routes: Routes = [

  {
    path: '', // standard url leads to main-page with navbar
//    component: MainPageComponent,
    component: HomeComponent,
    canActivate: [authGuard],
    children: [ //one of these routes will display main-page content additionally to router outlet
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'preSearch',
        component: PreSearchComponent
      },
      {
        path: 'searchResults',
        component: SearchResultsComponent
      },
    ]
  },
  {
    path: 'music',
    component: MusicComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login', // one of the other routes will only display the related component
    component: LoginFormComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**', // all non-registered urls are redirected to standard url
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}



