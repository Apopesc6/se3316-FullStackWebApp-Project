import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {
  
  
  accExists:boolean;
  
  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
  }
  
  //when the user clicks the sign up button
  signupUser(username: string, password: string) {
    
    //if the password is not blank (email validation is handled in the html with angular's build in "email" property)
    if (password !=''){
      //accesses the service to add user details to the database.
      this._auth.addUserDetails(username, password);
      
      setTimeout(() => {
        
        //gets if the email has already been used from the service
        this.accExists = this._auth.getAccExists();
        
        //if it hasn't then it allows the sign up
        if (this.accExists == false){
          alert("Sign up successful, navigating to log in page");
          //routes to the log in page
          this._router.navigateByUrl('/login');
        //if the email has already been used, does not allow the sign up  
        }else if (this.accExists == true){
          alert("This email is already taken, please choose another");
        }
        
      }, 1000);  
    //if the user does not enter a password  
    }else{
      alert("Please enter a password to create an account");
    }
    
  }
  
  //clicking back routes back to the home page.
  backToHome() {
    this._router.navigateByUrl('');
  }

}
