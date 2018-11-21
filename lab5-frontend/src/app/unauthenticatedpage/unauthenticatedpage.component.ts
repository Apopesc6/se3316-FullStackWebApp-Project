import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemdbService } from '../itemdb.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-unauthenticatedpage',
  templateUrl: './unauthenticatedpage.component.html',
  styleUrls: ['./unauthenticatedpage.component.css'],
  providers: [ItemdbService]
})
export class UnauthenticatedpageComponent implements OnInit {
  
  items;

  constructor(private _router: Router, private _itemdb: ItemdbService) { 
    
  }

  ngOnInit() {
    this.items = this._itemdb.getItems();
  }

  viewDesc(item){
    //Used to get only the name of the item from the string
    var nameString = (item.substr(6, (item.indexOf('$')-14))).toString();
    
    console.log(nameString);
    this._itemdb.getDesc(nameString);
  }
  
  backToHome() {
    this._router.navigateByUrl('');
  }
}
