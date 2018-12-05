import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ItemdbService} from '../itemdb.service';
import {RatingdbService} from '../ratingdb.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-managerpage',
  templateUrl: './managerpage.component.html',
  styleUrls: ['./managerpage.component.css'],
  providers: [ItemdbService, RatingdbService, AuthService]
})
export class ManagerpageComponent implements OnInit {
  
  items;
  
  ratings;
  
  ratingArr: string[] = [];
  itemDescription: string[] = [];
  descFound: boolean[] = [];
  userArr: string[] = [];
  managerArr: string[] = [];
  itemIndex: number;
  listSize:number;

  constructor(private _router: Router, private _itemdb: ItemdbService, private _ratingdb: RatingdbService, private _auth: AuthService) { }

  //loads the items in the catalog when the page is initialized
  ngOnInit() {
    
    //calls the service function to get all users and managers
    this._auth.getUsers();
    this._auth.getAllManagers();
    
    //gets all items and displays them on screen
    this.items = this._itemdb.getItems();
    
    setTimeout(() => {
      
      //sets the manager array and the user array to the data obtained from the service
      this.managerArr = this._auth.getManagerArr();
      
      this.listSize = this._itemdb.getItemArraySize();
      
      this.userArr = this._auth.getUsersArr();
      
    }, 1000);
    
  //fills the boolean array with false initially to show  no item descriptions or ratings until clicked.
   var num:number = 0;
    for(num=0;num<=this.listSize;num++) {
      this.descFound[num]=false;
    }
    
  }
  
  //when the manager clicks on an item, it shows the description
  viewDesc(item, listIndex: number){
    
    //Used to get only the name of the item from the string
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    
    
    //allows the user to click again to hide the description and rating
    if (this.descFound[listIndex] == true){
      this.descFound[listIndex] = false;
      
    //if the user clicks on the item and there is no description showing, it shows  
    }else{
      
      //get ratings for a specific item
      this.ratings = this._ratingdb.getRatings(nameString);
      
      //waits 1s for the ratings to be obtained from the database first
      setTimeout(() => {
      //creates a temporary string entry variable  
      var stringEntry:string="";
      //adds each entry in the array to a single string
        for(var i=0;i<this.ratings.length;i++){
          if (i == 0){
            stringEntry = (this.ratings[i]);
          }else{
            stringEntry = (stringEntry+" "+this.ratings[i]);
          };
        };
        //adds the ratings to the array of the to show next to the appropriate item
        this.ratingArr[listIndex] = stringEntry;
      }, 1000);
      
      
      //gets the description from the service
      this.itemDescription[listIndex] = this._itemdb.getDesc(nameString);
      
      this.descFound[listIndex] = true;
    };
    
    this.itemIndex = listIndex;
    
  }
  
  
  //when the manager wants to add an item to the database
  addItem(name:string, quantity:string, price:string, tax:string, description:string, purchases:string){
    
    //calls the service function to add the item, passing in the item name, quantity, price, etc..
    this._itemdb.addItem(name,quantity,price,tax,description,purchases);
    
    //reloads the window to show the new item
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  
  //when log out is clicked, it routes back to home
  backToHome() {
    this._router.navigateByUrl('');
  }
  
  //for deleting an item from the catalog
  deleteItem(item){
    //gets the name of the item
    var nameString = item.substring(6, (item.indexOf('$')-8));
    //passes the name to the service function that handles deleting
    this._itemdb.deleteItem(nameString);
    //refreshes the page to show that the item has been deleted
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  
  //for editing the price of an item (functions similar to deleteItem)
  editPrice(item, price: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    this._itemdb.updateItemPrice(nameString, price);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  //for editing the tax of an item (functions similar to deleteItem)
  editTax(item, tax: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
     this._itemdb.updateItemTax(nameString, tax);
     
     setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  //for editing the quantity of an item (functions similar to deleteItem)
  editQuantity(item, quantity: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
     this._itemdb.updateItemQuantity(nameString, quantity);
     
     setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  //for editing the name of an item (functions similar to deleteItem)
  editName(item, name: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    this._itemdb.updateItemName(nameString, name);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  //for editing the description of an item (functions similar to deleteItem)
  editDesc(item, desc: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    this._itemdb.updateItemDesc(nameString, desc);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  
  //for toggling a user's active/inactive status
  inactiveUser(user){
    
    //gets the username, and gets if the user is currently active
    var username = user.substring(10, user.indexOf(','));
    var active = user.substring(user.indexOf(',')+10,user.length);
    
    //creates a boolean opposite to what the user currently is (active or inactive)
    if (active == "true"){
      var setActive = false;
    }else if (active == "false"){
      var setActive = true;
    };
    
    //calls the service function to handle updating the user's status
    this._auth.updateActive(username, setActive);
    
    //reloads the window to show the updated user's status
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  
  //for granting admin privelages to the user
  adminUser(user){
    //gets the username from the string
    var username = user.substring(10, user.indexOf(','));
    //calls the service function that handles adding the user to the manager database
    this._auth.addManager(username);
    
    //reloads the window to show the updated manager list
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  
  //routes to the security page (containg copyright policies)
  toSecurity(){
    this._router.navigateByUrl('/security');
  }
  
  //routes to the document describing the workflow and instruction of dmca tools
  toDoc(){
    this._router.navigateByUrl('/dmcadoc');
  }
  
  //routes to the dmca tools page
  logReq(){
    this._router.navigateByUrl('/dmcatools');
  }
  
}
