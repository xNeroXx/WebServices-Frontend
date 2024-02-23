import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {MainPageComponent} from "./components/main-page/main-page.component";

import {LoginFormComponent} from "./components/login-form/login-form.component";
import {DummyComponent} from "./components/dummy/dummy.component";
import {HomeComponent} from "./components/home/home.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {SignupComponent} from "./components/signup/signup.component";

const routes: Routes = [

  {
    path: '', // standard url leads to main-page with navbar
    component: MainPageComponent,
    children: [ //one of these routes will display main-page content additionally to router outlet
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'dummy',
        component: DummyComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }

    ]
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
export class AppRoutingModule { }
