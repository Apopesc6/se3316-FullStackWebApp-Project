import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AuthenticatedpageComponent } from './authenticatedpage/authenticatedpage.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagerpageComponent } from './managerpage/managerpage.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthenticatedpageComponent } from './unauthenticatedpage/unauthenticatedpage.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthenticatedpageComponent,
    HomeComponent,
    LoginComponent,
    ManagerpageComponent,
    SignupComponent,
    UnauthenticatedpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'unAuth',
        component: UnauthenticatedpageComponent
      },
      {
        path: 'Auth',
        component: AuthenticatedpageComponent
      },
      {
        path: 'manager',
        component: ManagerpageComponent
      }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
