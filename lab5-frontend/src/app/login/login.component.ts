import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  
  usernameAcc:string;
  passwordAcc:string;
  successfulLogIn:boolean = false;
  
  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
  }
  
  loginUser(username: string, password: string) {
    
    this.usernameAcc = username;
    this.passwordAcc = password;
    
    //passes the username and password to the backend function used to get from the database
    this._auth.getUserDetails(username,password);
    
    //waits 1s so it gives time to recieve the http get response
    setTimeout(() => {
      //gets the boolean value for if it is a successful log in or not
      this.successfulLogIn = this._auth.getSuccessfulLogin();
      
      if (this.successfulLogIn == true){
        alert ("Successful login, routing to main page");
        this._router.navigateByUrl('/Auth');
      }else{
        alert ("Unsuccessful login, try again");
      };
      
    }, 1000);
    
    
  }

  backToHome() {
    this._router.navigateByUrl('');
  }
  
}
