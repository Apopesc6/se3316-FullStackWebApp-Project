import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AuthService]
})
export class AdminComponent implements OnInit {
  
  isAdmin: boolean = false;
  successfulLogIn:boolean = false;
  activeAcc:boolean = false;

  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
  }
  
  
  //when the log in button is clicked
  loginAdmin(username:string, password: string) {
    
    //if the default manager username and password is used, then it logs in without querying the database
    if(username == "store manager" && password == "manager"){
      alert ("Successful login, routing to manager page.");
      //routes to the manager page
      this._router.navigateByUrl('/manager');
      
    }else{
      
      //gets the manager from the manager database based on the entered username
      this._auth.getManager(username);
      //gets the user info based on the entered username and password
      this._auth.getUserDetails(username,password);
      
      //waits for the http response
      setTimeout(() => {
        
        //gets if the user is an admin from the auth service
        this.isAdmin = this._auth.getisManager();
        //gets if the user credentials match what is stored in the database from the auth service
        this.successfulLogIn = this._auth.getSuccessfulLogin();
        //gets if the account is active from the auth service
        this.activeAcc = this._auth.getActiveAcc();
        
        //if the user is an admin, and if the credentials match, and if it is an active account, it allows the log in
        if (this.isAdmin == true && this.successfulLogIn == true && this.activeAcc){
        
          alert ("Successful login, routing to manager page.");
          this._router.navigateByUrl('/manager');
        
        //otherwise, it tells the user that it is an invalid log in
        }else{
          alert ("Invalid Credentials, or this user is not an admin");
        };
      
    
      }, 1000);
    }
  }
    
    
//when back to home is clicked, it navigates back to the home page.
  backToHome() {
    this._router.navigateByUrl('');
  }
  
}
