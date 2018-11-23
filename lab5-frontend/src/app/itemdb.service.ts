import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ItemdbService {
  
  
  private Price: string = '';
  private Tax: string = '';
  private Quantity: string = '';
  private Name: string = '';
  private Description:string = '';
  private AmountPurchased:string = '';
  
  //Array for each item entry
  private itemArray: string[] = [];
  
  //stores the description for each item in a dictionary so it can be easily accessed by key later on.
  private descArr = {};

  constructor(private httpClient: HttpClient) { }
  
  getItems() :string[]{
    
    this.httpClient.get(`api/ItemDatabase/allItems`)
    .subscribe(
      (data:any) => {
          
          var database = JSON.parse(JSON.stringify(data));
          //sets the values retrieved from the server to the variables in the service
          database.forEach(iteminDatabase => {
            this.Name = iteminDatabase.itemName;
            this.Price = iteminDatabase.itemPrice;
            this.Tax = iteminDatabase.itemTax;
            this.Quantity = iteminDatabase.itemQuantity;
            this.Description = iteminDatabase.itemDesc;
            this.AmountPurchased = iteminDatabase.itemBuyNo;
            
            //dictionary used to store each description for each specific item name
            this.descArr[this.Name] = this.Description;
            
            //Adds each item into a single string, then pushed into a string array
            var stringEntry = ("Name: " +this.Name+ " Price: $" +this.Price+ " Tax: " +this.Tax+ "% Quantity: "+this.Quantity+ " # of Buys: " +this.AmountPurchased);
            
            this.itemArray.push(stringEntry);
          });
          
      }
      )
    
    return this.itemArray;
    
  }
   
  
  getDesc(itemDescName: string) : string{
    //Requires the name which acts as the key (used to find the description)
    
    //Gets the item description from the dictionary
    var Desc = this.descArr[itemDescName];
    
    return Desc;
  }
      
  
  getItemArraySize():number{
    return this.itemArray.length;
  }
  
}

