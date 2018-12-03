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
  
  signupUser(username: string, password: string) {
    
    if (password !=''){
      //accesses the service to add user details to the database.
      this._auth.addUserDetails(username, password);
      
      setTimeout(() => {
        
        this.accExists = this._auth.getAccExists();
        
        if (this.accExists == false){
          alert("Sign up successful, navigating to log in page");
          //if the user's sign up credentials are correct, make them log in with their new account.
          this._router.navigateByUrl('/login');
        }else if (this.accExists == true){
          alert("This email is already taken, please choose another");
        }
        
      }, 1000);  
      
    }else{
      alert("Please enter a password to create an account");
    }
    
  }

  backToHome() {
    this._router.navigateByUrl('');
  }

}
