import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemdbService } from '../itemdb.service';

@Component({
  selector: 'app-authenticatedpage',
  templateUrl: './authenticatedpage.component.html',
  styleUrls: ['./authenticatedpage.component.css'],
  providers: [ItemdbService]
})
export class AuthenticatedpageComponent implements OnInit {
  
  items;
  
  itemDescription: string[] = [];
  descFound: boolean[] = [];
  itemIndex: number;
  listSize:number;

  constructor(private _router: Router, private _itemdb: ItemdbService) { }

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
    
    //gets the description from the service
    this.itemDescription[listIndex] = this._itemdb.getDesc(nameString);
    
    //allows the user to click again to hide the item
    if (this.descFound[listIndex] == true){
      this.descFound[listIndex] = false;
    }else{
      this.descFound[listIndex] = true;
    };
    
    
    this.itemIndex = listIndex;
    
  }
  
  backToHome() {
    this._router.navigateByUrl('');
  }
  
}
