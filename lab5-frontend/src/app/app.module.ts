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
import { SecuritypolicyComponent } from './securitypolicy/securitypolicy.component';
import { UserpoliciesComponent } from './userpolicies/userpolicies.component';
import { DMCAdocComponent } from './dmcadoc/dmcadoc.component';
import { DmcatoolsComponent } from './dmcatools/dmcatools.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthenticatedpageComponent,
    HomeComponent,
    LoginComponent,
    ManagerpageComponent,
    SignupComponent,
    UnauthenticatedpageComponent,
    SecuritypolicyComponent,
    UserpoliciesComponent,
    DMCAdocComponent,
    DmcatoolsComponent
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
        path: 'Auth/:id',
        component: AuthenticatedpageComponent
      },
      {
        path: 'manager',
        component: ManagerpageComponent
      },
      {
        path: 'security',
        component: SecuritypolicyComponent
      },
      {
        path: 'userpolicy',
        component:UserpoliciesComponent
      },
      {
        path: 'authpolicy/:id',
        component:UserpoliciesComponent
      },
      {
        path: 'dmcadoc',
        component: DMCAdocComponent
      },
      {
        path: 'dmcatools',
        component: DmcatoolsComponent
      }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
