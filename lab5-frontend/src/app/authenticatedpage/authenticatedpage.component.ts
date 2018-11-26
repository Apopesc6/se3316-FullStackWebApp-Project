import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemdbService } from '../itemdb.service';
import {AuthService} from '../auth.service';
import {RatingdbService} from '../ratingdb.service';

@Component({
  selector: 'app-authenticatedpage',
  templateUrl: './authenticatedpage.component.html',
  styleUrls: ['./authenticatedpage.component.css'],
  providers: [ItemdbService, AuthService, RatingdbService]
})
export class AuthenticatedpageComponent implements OnInit {
  
  items;
  
  ratings;
  
  ratingArr: string[] = [];
  itemDescription: string[] = [];
  descFound: boolean[] = [];
  itemIndex: number;
  listSize:number;
  
  loggedinAcc: string;
  itemName: string;

  constructor(private _router: Router, private _itemdb: ItemdbService, private _ratingdb: RatingdbService) { }
  
  
  //When the page is initialized, it loads item catalog
  ngOnInit() {
    
    this.items = this._itemdb.getItems();

    //waits 1s for the http request
    setTimeout(() => {
      this.listSize = this._itemdb.getItemArraySize();
    }, 1000);
    
    
    
  //fills the boolean array with false initially to show  
   var num:number = 0;
    for(num=0;num<=this.listSize;num++) {
      this.descFound[num]=false;
    }
  }
  
  
  //when a user clicks on an item to view the description
  viewDesc(item, listIndex: number){
    
    //Used to get only the name of the item from the string that is in the catalog
    var nameString = item.substr(6, (item.indexOf('$')-14));
    
    
    //allows the user to click again to hide the item
    if (this.descFound[listIndex] == true){
      //hides the value when clicked again
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
      
      
      //get the description for the specific item
      this.itemDescription[listIndex] = this._itemdb.getDesc(nameString);
      //sets descFound to true, so when the user clicks it again, hides the value
      this.descFound[listIndex] = true;
    };
    
    this.itemIndex = listIndex;
    
    
    
  }
  
  
  addRating (item, comment:string, rating: number){
    
    //gets the url of the page
    var url = this._router.url;
    
    //gets the username from the url of the page
    this.loggedinAcc = url.substr((url.indexOf('-')+7), url.length);
    
    //gets the itemname from using substring on the list item
    var itemname = item.substr(6, (item.indexOf('$')-14));
  
    //forces the user to enter a rating between 1 and 5, and not leave the comment blank
    if (rating < 1 || rating > 5){
      alert ("Please enter a number between 1 and 5");
    }else if (comment ==""){
      alert ("Please enter a value for comment");
    }else{
      //uses addRating from the service to add the rating to the database
      this._ratingdb.addRating(this.loggedinAcc, itemname, comment, rating);
      alert ("Added rating successfully");
    };
    
  }
  
  
  //When the user clicks log out
  backToHome() {

    //goes back to the homepage, and resets the username stored in the string
    this._router.navigateByUrl('');
  }
  
}
