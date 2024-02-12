import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {DummyComponent} from "./components/dummy/dummy.component";

const routes: Routes = [

  {
    path: '', // standard url leads to home with navbar
    component: HomeComponent,
    children: [ //one of these routes will display home content additionally to router outlet
      {
      path: 'dummy',
      component: DummyComponent
      }
    ]
  },
  {
    path: 'login', // one of the other routes will only display the related component
    component: LoginFormComponent
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
