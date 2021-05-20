import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PlatComponent } from './components/plat/plat.component';
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { Page404Component } from './components/page404/page404.component';
import { ConfidentialiteComponent } from './components/confidentialite/confidentialite.component';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { HomeTypeComponent } from "./home/home-type/home-type.component";
import { FormDishComponent } from "./components/form-dish/form-dish.component";
import {AboutComponent} from "./components/about/about.component";

export const appRouteList: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/:type',
    component: HomeTypeComponent
  },
  {
    path: 'plat',
    component: PlatComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'confidentialite',
    component: ConfidentialiteComponent
  },
  {
    path: 'add-dish',
    component: FormDishComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];













