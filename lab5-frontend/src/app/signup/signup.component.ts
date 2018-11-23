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

  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
  }
  
  signupUser(username: string, password: string) {
    
    if (password !=''){
      //accesses the service to add user details to the database.
      this._auth.addUserDetails(username, password);
      alert("Sign up successful, navigating to log in page");
      //if the user's sign up credentials are correct, make them log in with their new account.
      this._router.navigateByUrl('/login');
    }else{
      alert("Please enter a password to create an account");
    }
    
  }

  backToHome() {
    this._router.navigateByUrl('');
  }

}
