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
  
  loginAdmin(username:string, password: string) {
    
    if(username == "store manager" && password == "manager"){
      alert ("Successful login, routing to manager page.");
      this._router.navigateByUrl('/manager');
      
    }else{
      
      this._auth.getManager(username);
      this._auth.getUserDetails(username,password);
      
      setTimeout(() => {
    
        this.isAdmin = this._auth.getisManager();
        this.successfulLogIn = this._auth.getSuccessfulLogin();
        this.activeAcc = this._auth.getActiveAcc();
      
        if (this.isAdmin == true && this.successfulLogIn == true && this.activeAcc){
        
          alert ("Successful login, routing to manager page.");
          this._router.navigateByUrl('/manager');
        
        }else{
          alert ("Invalid Credentials, or this user is not an admin");
        };
      
    
      }, 1000);
    }
  }
    
    
    

  backToHome() {
    this._router.navigateByUrl('');
  }
  
}
