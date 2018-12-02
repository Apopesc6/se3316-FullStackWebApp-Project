import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private successfulLogIn: boolean = false;
  private usernameAcc: string;
  private passwordAcc: string;
  private adminAcc: string;
  private activeAcc: boolean = false;
  private isManager: boolean = false;
  private users: string[] = [];
  private managerArr:string[] = [];
  

  constructor(private httpClient: HttpClient) { }
  
  
  //Used with the signup page to add a new user to the user account database
  addUserDetails(username: string, password: string){

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
  
  
  
  addManager(username:string){
    
    this.httpClient.post(`api/ManagerDatabase/createAdmin`, {
      //using the values passed in
      userName: username
      
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
  
  
  getManager(username: string){
    
    this.httpClient.get(`api/ManagerDatabase/${username}`)
    .subscribe(
      (data:any) => {
          console.log(JSON.stringify(data));
          this.adminAcc = data.userName;
          

          this.isManager = true;
          
      }
      )
    
  }
  
  
  getAllManagers(){
    this.httpClient.get(`api/ManagerDatabase/allManagers`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(managerinDatabase =>{
           var user = managerinDatabase.userName;
          
           var stringEntry = ("Username: " + user);
          
           this.managerArr.push(stringEntry);
          
         });
        
      }
      )
  }
  
  
  getUsers(){
    this.httpClient.get(`api/LoginDatabase/allUsers`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(userinDatabase =>{
          var user = userinDatabase.userName;
          var isActive = userinDatabase.isActive;
          
          var stringEntry = ("Username: " + user + ", Active: " +isActive);
          
          this.users.push(stringEntry);
          
        });
        
      }
      )
  } 
  
  
  
  
  
  updateActive(name: string, active: boolean){
    this.httpClient.post(`api/LoginDatabase/updateActive`, {
      //using the values passed in
      userName: name,
      isActive: active
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  getManagerArr(): string[]{
    return this.managerArr;
  }
  
  getUsersArr(): string[]{
    return this.users;
  }
  
  
  getisManager(): boolean{
    return this.isManager;
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
