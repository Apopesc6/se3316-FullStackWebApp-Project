import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ItemdbService} from '../itemdb.service';

@Component({
  selector: 'app-managerpage',
  templateUrl: './managerpage.component.html',
  styleUrls: ['./managerpage.component.css'],
  providers: [ItemdbService]
})
export class ManagerpageComponent implements OnInit {
  
  items;
  
  itemDescription: string[] = [];
  descFound: boolean[] = [];
  itemIndex: number;
  listSize:number;

  constructor(private _router: Router, private _item: ItemdbService) { }

  ngOnInit() {
  }
  
  addItem(name:string, quantity:string, price:string, tax:string, description:string, purchases:string){
    
    this._item.addItem(name,quantity,price,tax,description,purchases);
    
  }
  
  backToHome() {
    this._router.navigateByUrl('');
  }
}
