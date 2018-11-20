import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  
  signupUser(username: string, password: string) {
    alert("Sign up successful, navigating to log in page");
    //if the user's sign up credentials are correct, make them log in with their new account.
    this._router.navigateByUrl('/login');
  }

  backToHome() {
    this._router.navigateByUrl('');
  }

}
