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
  
  
  
  
  private buyNo: number[] = [];
  
  private buyNoDict = {};
  
  

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
            
            //doesn't store items with a quantity of 0
            if (this.Quantity != "0"){
              //dictionary used to store each description for each specific item name
            this.descArr[this.Name] = this.Description;
            
            //convert the amount purchased retrieved from the database into a string
            var amountPurchasedInt = parseInt(this.AmountPurchased);
            
            //push the amount bought into an array
            this.buyNo.push(amountPurchasedInt);
            
            //Adds each item into a single string
            var stringEntry = ("Name: " +this.Name+ " Price: $" +this.Price+ " Tax: " +this.Tax+ "% Quantity: "+this.Quantity+ " # of Buys: " +this.AmountPurchased);
            
            //add a dictionary entry with the amount bought as the index, and the whole string entry
            this.buyNoDict[amountPurchasedInt] = stringEntry;
            };
            
          });
          
      }
      )
    
    //wait 1s to get the http response back
    setTimeout(() => {
    
    //create a new array that sorts the array of amounts bought
    var sortedPurchases: number[] = this.buyNo.sort((n1,n2) => n1 - n2);
    
    //pushes the string entries in order of which item is bought the most with the use of the dictionary and the sorted amount array
    for (var i = sortedPurchases.length-1; i>=0; i--){
      this.itemArray.push (this.buyNoDict[sortedPurchases[i]]);
    }
    
    }, 1000);
    
    return this.itemArray;
    
  }
   
  
   
  //used by the manager to add items to the catalog
  addItem(name:string, quantity:string, price:string, tax:string, description:string, purchases:string){
    
    this.httpClient.post(`api/ItemDatabase/createItem`, {
      //using the values passed in
      itemName: name,
      itemQuantity: quantity,
      itemPrice: price,
      itemTax: tax,
      itemDesc: description,
      itemBuyNo: purchases
      
    })
    .subscribe(
      (data:any[]) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
    
  
  getDesc(itemDescName: string) : string{
    //Requires the name which acts as the key (used to find the description)
    //Gets the item description from the dictionary
    var Desc = this.descArr[itemDescName];
    
    return Desc;
  }
      
  
  //returns the size of the item array    
  getItemArraySize():number{
    return this.itemArray.length;
  }
  
  
  //for the manager updating the item quantity
  updateItemQuantity(name: string, quantity: string){
    //http post request to the backend function updateItemQuantity() in ItemDatabase
    this.httpClient.post(`api/ItemDatabase/updateItemQuantity`, {
      //using the values passed in
      itemName: name,
      itemQuantity: quantity
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  //functions similar to updateItemQuantiity()
  updateItemTax(name: string, tax: string){
    this.httpClient.post(`api/ItemDatabase/updateItemTax`, {
      //using the values passed in
      itemName: name,
      itemTax: tax
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
    
  //functions similar to updateItemQuantiity()
  updateItemPrice(name: string, price: string){
    
    
    this.httpClient.post(`api/ItemDatabase/updateItemPrice`, {
      //using the values passed in
      itemName: name,
      itemPrice: price
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  //functions similar to updateItemQuantiity()
  updateItemDesc(name: string, desc: string){
    
    this.httpClient.post(`api/ItemDatabase/updateItemDesc`, {
      //using the values passed in
      itemName: name,
      itemDesc: desc
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  //functions similar to updateItemQuantiity()
  updateItemName(oldname: string, newname: string){
    
    this.httpClient.post(`api/ItemDatabase/updateItemName`, {
      //using the values passed in
      newName: newname,
      oldName: oldname
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  //functions similar to updateItemQuantiity()
  updateItemSales(name: string, sales: string){
    this.httpClient.post(`api/ItemDatabase/updateItemSales`, {
      //using the values passed in
      itemName: name,
      itemBuyNo: sales
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
  }
  
  //function for deleting the item (used by the manager)
  deleteItem(name:string){
    //http delete request sent to deleteItem() in ItemDatabase, with name passed in as a parameter in the header.
    this.httpClient.delete(`api/ItemDatabase/deleteItem/${name}`)
      .subscribe(
      (data:any[]) => {
        //console.log(data);
          console.log(data);
      }
      )
  }
  
}

