import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRouteList } from './AppRoutingModule';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselTypeComponent } from './home/carousel-type/carousel-type.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { PlatsComponent } from './home/plats/plats.component';
import { PlatComponent } from './components/plat/plat.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { Page404Component } from './components/page404/page404.component';
import { ConfidentialiteComponent } from './components/confidentialite/confidentialite.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeTypeComponent } from './home/home-type/home-type.component';
import { FormDishComponent } from "./components/form-dish/form-dish.component";
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    PlatComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HeaderComponent,
    FooterComponent,
    CarouselTypeComponent,
    UserProfileComponent,
    PlatsComponent,
    PlatComponent,
    HomeTypeComponent,
    PlatComponent,
    FormDishComponent,
    Page404Component,
    ConfidentialiteComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    IvyCarouselModule,
    RouterModule,
    RouterModule.forRoot(appRouteList),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
