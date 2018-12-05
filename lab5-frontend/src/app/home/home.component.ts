import { Component, OnInit } from '@angular/core';
import { ItemdbService } from '../itemdb.service';
import {RatingdbService} from '../ratingdb.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ItemdbService,RatingdbService]
})
export class HomeComponent implements OnInit {
  items;
  ratings;
  
  fiveRatings: string[] = [];
  topten: string[] = [];
  
  ratingArr:string[] = [];
  itemDescription: string[] = [];
  descFound: boolean[] = [];
  itemIndex: number;
  listSize:number;
  
  
  constructor(private _itemdb: ItemdbService, private _ratingdb: RatingdbService) { }

  ngOnInit() {
    
    //gets all of the items from the service function which gets them from the databse with an http request to the backend 
    this.items = this._itemdb.getItems();
    
    //waits for the http response then gets the list size
    setTimeout(() => {
      this.listSize = this._itemdb.getItemArraySize();
    }, 500);
    
    //waits for the http response then adds only 10 items to the list displayed on screen
    setTimeout(()=>{

      for (var i = 0; i<10;i++){
        this.topten[i] = this.items[i];
      };
      
    },1000);
    
  //fills the boolean array with false initially to show no descriptions or ratings
    var num:number = 0;
    for(num=0;num<=this.listSize;num++) {
      this.descFound[num]=false;
    }
  }
  
  
  
  viewDesc(item, listIndex: number){
    
    //Used to get only the name of the item from the string
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    //allows the user to click again to hide the description and rating
    if (this.descFound[listIndex] == true){
      this.descFound[listIndex] = false;
    
    //if the there is no description showing, and the user clicks on the item, it shows description and rating  
    }else{
      this.descFound[listIndex] = true;
      this.ratings = this._ratingdb.getRatings(nameString);
      
      
      //waits 1s for the ratings to be obtained from the database first
      setTimeout(() => {
      //creates a temporary string entry variable  
      var stringEntry:string="";
      
      //THIS IS TO ENSURE 5 RATINGS MAX APPEAR
      //if there are less than 5 ratings, then it will use ratings.length for the parameter of the for loop.
      if(this.ratings.length < 5){
        
        for(var i=0;i<this.ratings.length;i++){
          if (i == 0){
            //adds each rating to a string which is added to the ratingArray later.
            stringEntry = (this.ratings[i]);
          }else{
            stringEntry = (stringEntry+" "+this.ratings[i]);
          };
        };
      //otherwise, it will use 5 as the parameter for the for loop.
      }else{
        
        for(var i=0;i<5;i++){
          if (i == 0){
            stringEntry = (this.ratings[i]);
          }else{
            stringEntry = (stringEntry+" "+this.ratings[i]);
          };
        };
        
      };
        //adds the ratings to the array of the to show next to the appropriate item
        this.ratingArr[listIndex] = stringEntry;
      }, 1000);
      
      
      //gets the description from the service
      this.itemDescription[listIndex] = this._itemdb.getDesc(nameString);
    };
    
    this.itemIndex = listIndex;
  }
}
