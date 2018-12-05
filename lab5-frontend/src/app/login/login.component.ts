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
  activeAcc:boolean = false;
  
  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
    
  }
  
  //when the user clicks the log in button
  loginUser(username: string, password: string) {
    
    this.usernameAcc = username;
    this.passwordAcc = password;
    
    //passes the username and password to the service that uses an http request to the backend function that sees if there exists a user with these credentials in the database.
    this._auth.getUserDetails(username,password);
    
    //waits 0.5s so it gives time to recieve the http get response
    setTimeout(() => {
      //gets the boolean value for if it is a successful log in or not, and if the account is active or not
      this.successfulLogIn = this._auth.getSuccessfulLogin();
      this.activeAcc = this._auth.getActiveAcc();
      
      //if its successful and the account is active it routes to the main page
      if (this.successfulLogIn == true && this.activeAcc == true){
        
        alert ("Successful login, routing to main page.");
        //passes username into the url to be used later
        this._router.navigateByUrl('/Auth/'+this.usernameAcc);
       
      //If the account is inactive, it displays a message to contact the manager  
      }else if (this.successfulLogIn == true && this.activeAcc == false){
        
        alert ("Inactive account, please contact your manager.")
      
      //If the credentials do not match, then it is an unsuccessful log in  
      }else{
        alert ("Unsuccessful login, try again.");
      };
    }, 1000);
  }

  //if log out is clicked, then it routes back to the home page.
  backToHome() {
    this._router.navigateByUrl('');
  }
  
}
