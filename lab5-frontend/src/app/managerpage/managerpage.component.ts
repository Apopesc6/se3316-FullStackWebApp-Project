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
    
    this._auth.getUsers();
    
    this._auth.getAllManagers();
    
    this.items = this._itemdb.getItems();
    
    setTimeout(() => {
      
      this.managerArr = this._auth.getManagerArr();
      
      this.listSize = this._itemdb.getItemArraySize();
      
      this.userArr = this._auth.getUsersArr();
      
    }, 1000);
    
  //fills the boolean array with false initially to show  
   var num:number = 0;
    for(num=0;num<=this.listSize;num++) {
      this.descFound[num]=false;
    }
    
  }
  
  //when the manager clicks on an item, it shows the description
  viewDesc(item, listIndex: number){
    
    //Used to get only the name of the item from the string
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    
    
    //allows the user to click again to hide the item
    if (this.descFound[listIndex] == true){
      this.descFound[listIndex] = false;
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
    
    this._itemdb.addItem(name,quantity,price,tax,description,purchases);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  
  backToHome() {
    this._router.navigateByUrl('');
  }
  
  deleteItem(item){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    this._itemdb.deleteItem(nameString);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  
  
  editPrice(item, price: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    this._itemdb.updateItemPrice(nameString, price);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  editTax(item, tax: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
     this._itemdb.updateItemTax(nameString, tax);
     
     setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  editQuantity(item, quantity: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
     this._itemdb.updateItemQuantity(nameString, quantity);
     
     setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  editName(item, name: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    this._itemdb.updateItemName(nameString, name);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  editDesc(item, desc: string){
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    this._itemdb.updateItemDesc(nameString, desc);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  
  inactiveUser(user){
    
    var username = user.substring(10, user.indexOf(','));
    var active = user.substring(user.indexOf(',')+10,user.length);
    
    if (active == "true"){
      var setActive = false;
    }else if (active == "false"){
      var setActive = true;
    };
    
    this._auth.updateActive(username, setActive);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  
  
  adminUser(user){
    var username = user.substring(10, user.indexOf(','));
    this._auth.addManager(username);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
  
  
  toSecurity(){
    this._router.navigateByUrl('/security');
  }
  
  
}
