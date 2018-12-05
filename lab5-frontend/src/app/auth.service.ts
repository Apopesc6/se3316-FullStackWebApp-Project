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
  
  private accExists: boolean = false;

  constructor(private httpClient: HttpClient) { }
  
  
  //Used with the signup page to add a new user to the user account database
  addUserDetails(username: string, password: string){
  //Post http request to the backend function createUser() from LoginDatabase
    this.httpClient.post(`api/LoginDatabase/createUser`, {
      //using the values passed in
      userName: username,
      userPassword: password,
      isActive: true
      
    })
    .subscribe(
      (data:any[]) => {
          console.log(data);
          
          var result = JSON.stringify(data);
          
          //the backend function will respond with a specific string if the account already exists
          var resultstr = result.substring(result.indexOf(':')+2, result.length-2);
          
          //if the account already exists set the boolean to true
          if (resultstr == "Item already exists"){
            this.accExists = true;
          }else{
            this.accExists = false;
          }
      }
      )
  }
  
  
  //return the boolean that stores if the account exists or not
  getAccExists(): boolean{
    return this.accExists;
  }
  
  
  //for adding a manager to the database
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
  
  //searches the database for a specific manager account
  getManager(username: string){
    
    this.httpClient.get(`api/ManagerDatabase/${username}`)
    .subscribe(
      (data:any) => {
          console.log(JSON.stringify(data));
          this.adminAcc = data.userName;
          
          //if it finds the email in the manager collection, it sets the boolean isManager to true
          this.isManager = true;
          
      }
      )
    
  }
  
  
  //gets all of the managers in the database
  getAllManagers(){
    this.httpClient.get(`api/ManagerDatabase/allManagers`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(managerinDatabase =>{
           var user = managerinDatabase.userName;
          
           var stringEntry = ("Username: " + user);
          
          //pushes each manager into an array to be displayed later
           this.managerArr.push(stringEntry);
          
         });
        
      }
      )
  }
  
  
  //gets all of the users
  getUsers(){
    this.httpClient.get(`api/LoginDatabase/allUsers`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(userinDatabase =>{
          var user = userinDatabase.userName;
          var isActive = userinDatabase.isActive;
          
          //creates a string entry with the data retreived
          var stringEntry = ("Username: " + user + ", Active: " +isActive);
          
          //adds the string entry to an array to be displayed on the screen later
          this.users.push(stringEntry);
          
        });
        
      }
      )
  } 
  
  
  //updates if the user account is active or  not
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
  
  //returns the manager string array
  getManagerArr(): string[]{
    return this.managerArr;
  }
  
  //returns the user string array
  getUsersArr(): string[]{
    return this.users;
  }
  
  //returns if the account is a manager
  getisManager(): boolean{
    return this.isManager;
  }
  
  //returns if the user credentials match what is stored in the database
  getSuccessfulLogin(): boolean{
      return this.successfulLogIn;
  }
  
  //returns if the account is active
  getActiveAcc(): boolean{
      return this.activeAcc;
  }
  

  
  
  
}
