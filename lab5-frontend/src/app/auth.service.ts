import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private successfulLogIn: boolean = false;
  private usernameAcc: string;
  private passwordAcc: string;
  private activeAcc: boolean = false;
  

  constructor(private httpClient: HttpClient) { }
  
  
  //Used with the signup page to add a new user to the user account database
  addUserDetails(username: string, password: string){
    
    console.log (username + " " +password);
    
    this.httpClient.post(`api/LoginDatabase/createUser`, {
      //using the values passed in
      userName: username,
      userPassword: password,
      isActive: true
      
    })
    .subscribe(
      (data:any[]) => {
          console.log(data);
      }
      )
  }
  
  
  
  //Used to get if the user log in is correct
  getUserDetails(username: string, password: string){
    
    this.httpClient.get(`api/LoginDatabase/${username}`)
    .subscribe(
      (data:any) => {
          console.log(JSON.stringify(data));
          this.usernameAcc = data.userName;
          this.passwordAcc = data.userPassword;
          this.activeAcc = data.isActive;
          
          if (this.passwordAcc == password){
            //if it finds the username, and the password entered is the same as the one stored in the database,
            //set the successful log in variable to true
            this.successfulLogIn = true;
          }
      }
      )

  }
  
  

  getSuccessfulLogin(): boolean{
      return this.successfulLogIn;
  }
  
  getActiveAcc(): boolean{
      return this.activeAcc;
  }
  getAdminDetails() {
    //Link to backend admin stuff here
  }
  
  
  
}
