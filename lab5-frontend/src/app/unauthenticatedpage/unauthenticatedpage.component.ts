import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemdbService } from '../itemdb.service';
import {RatingdbService} from '../ratingdb.service';


@Component({
  selector: 'app-unauthenticatedpage',
  templateUrl: './unauthenticatedpage.component.html',
  styleUrls: ['./unauthenticatedpage.component.css'],
  providers: [ItemdbService,RatingdbService]
})
export class UnauthenticatedpageComponent implements OnInit {
  
  items;
  ratings;
  
  ratingArr:string[] = [];
  itemDescription: string[] = [];
  descFound: boolean[] = [];
  itemIndex: number;
  listSize:number;


  constructor(private _router: Router, private _itemdb: ItemdbService, private _ratingdb: RatingdbService) { 
    
  }

  ngOnInit() {
    this.items = this._itemdb.getItems();
    
    setTimeout(() => {
      this.listSize = this._itemdb.getItemArraySize();
    }, 500);
    
  //fills the boolean array with false initially to show  
   var num:number = 0;
    for(num=0;num<=this.listSize;num++) {
      this.descFound[num]=false;
    }
    
  }

  viewDesc(item, listIndex: number){
    
    //Used to get only the name of the item from the string
    var nameString = item.substr(6, (item.indexOf('$')-14));
    
    
    
    //allows the user to click again to hide the item
    if (this.descFound[listIndex] == true){
      this.descFound[listIndex] = false;
    }else{
      this.descFound[listIndex] = true;
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
    };
    
    
    this.itemIndex = listIndex;
    
  }
  
  backToHome() {
    this._router.navigateByUrl('');
  }
}
