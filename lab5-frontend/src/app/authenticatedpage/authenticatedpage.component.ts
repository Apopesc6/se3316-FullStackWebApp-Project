import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemdbService } from '../itemdb.service';
import {RatingdbService} from '../ratingdb.service';
import {CollectiondbService} from '../collectiondb.service';

@Component({
  selector: 'app-authenticatedpage',
  templateUrl: './authenticatedpage.component.html',
  styleUrls: ['./authenticatedpage.component.css'],
  providers: [ItemdbService, RatingdbService, CollectiondbService]
})
export class AuthenticatedpageComponent implements OnInit {
  
  items;
  
  ratings;
  
  itemQuanDict = {};
  itemPriceDict = {};
  itemTaxDict = {};
  
  userCollName: string[] = [];
  userCollData: string[] = [];
  userCollDesc: string[] = [];
  
  pubCollName: string[] = [];
  pubCollData: string[] = [];
  pubCollDesc: string[] = [];
  
  unsavedColl: string[] = [];
  
  pubCollShowed: boolean[] = [];
  userCollShowed:boolean[] = [];
  
  itemQuantityArr:string[] =[];
  itemSalesArr:string[] = [];
  
  shoppingCart:string[] = [];
  quantityShopArr:string[] = [];
  shoppingIndexArr:number[] = [];
  subtotal: number = 0;
  
  ratingArr: string[] = [];
  itemDescription: string[] = [];
  descFound: boolean[] = [];
  itemIndex: number;
  listSize:number;
  
  loggedinAcc: string;
  itemName: string;

  constructor(private _router: Router, private _itemdb: ItemdbService, private _ratingdb: RatingdbService, private _collectiondb: CollectiondbService) { }
  
  
  //When the page is initialized, it loads item catalog
  ngOnInit() {
    
    //gets the url of the page
    var url = this._router.url;
    
    
    //gets the username from the url of the page
    
    this.loggedinAcc = url.substring(6,url.length);
    
    this.items = this._itemdb.getItems();
    
    this._collectiondb.getUserCollections(this.loggedinAcc);
    this._collectiondb.getPublicCollections();

    //waits 1s for the http request
    setTimeout(() => {
      
      this.pubCollName = this._collectiondb.getPubCollectionsNameArr();
      this.pubCollData = this._collectiondb.getPubCollectionsDataArr();
      this.pubCollDesc = this._collectiondb.getPubCollectionsDescArr();
      
      this.userCollName = this._collectiondb.getUserCollectionsNameArr();
      this.userCollData = this._collectiondb.getUserCollectionsDataArr();
      this.userCollDesc = this._collectiondb.getUserCollectionsDescArr();
      
      this.listSize = this._itemdb.getItemArraySize();
      
      
      
      for(var num=0;num<this.listSize;num++) {
        //fills the boolean array with false initially to hide all descriptions 
        this.descFound[num]=false;
      }
      
      
      for(var i = 0; i<this.userCollName.length;i++){
        this.userCollShowed[i] = false;
      }
      
      for (var i = 0; i<this.pubCollName.length;i++){
        this.pubCollShowed[i] = false;
      }
      
      
      //a lot of substring is used here to get the specific values from each entry in the item catalog (because each entry is one entire string)
      for(var i = 0;i<this.listSize;i++){
        
        var itemname = this.items[i].substring(6, (this.items[i].indexOf('$')-8));
        
        var itemTaxes = Number(this.items[i].substring((this.items[i].indexOf('%')-2), (this.items[i].indexOf('%'))));
      
        var itemPrices = Number(this.items[i].substring((this.items[i].indexOf('$')+1), (this.items[i].indexOf('%')-8)));
        
        var itemQuantities = this.items[i].substring((this.items[i].indexOf('%')+12),(this.items[i].indexOf('#')-1));
        
        var itemSales = this.items[i].substring((this.items[i].indexOf('#')+11),this.items[i].length);
        
        
        this.itemTaxDict[itemname] = itemTaxes;
        //fills the item price dictionary to be used when updating shopping cart quantities
        this.itemPriceDict[itemname] = itemPrices;
        //fills the quantity dictionary to be used when updating shopping cart quantities
        this.itemQuanDict[itemname] = itemQuantities;
         //filling the quantity array with the quantity of each item
        this.itemQuantityArr[i] = itemQuantities;
        //filling the sales array with the sales of each item
        this.itemSalesArr[i] = itemSales;
      }
      
    }, 1000);
  

  }
  
  
  
  //when a user clicks on an item to view the description
  viewDesc(item, listIndex: number){
    
    //Used to get only the name of the item from the string that is in the catalog
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
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
  
  
  
  viewUserCollDesc (index:number){
    
    if (this.userCollShowed[index] == true){
      //hides the value when clicked again
      this.userCollShowed[index] = false;
    }else{
      //sets descFound to true, so when the user clicks it again, hides the value
      this.userCollShowed[index] = true;
    };
    
  }
  
  
  viewPubCollDesc(index:number){
    
    if (this.pubCollShowed[index] == true){
      //hides the value when clicked again
      this.pubCollShowed[index] = false;
    }else{
      //sets descFound to true, so when the user clicks it again, hides the value
      this.pubCollShowed[index] = true;
    };
  }
  
  
  //When the user clicks the add rating button
  addRating (item, comment:string, rating: number){
    
    //gets the itemname from using substring on the list item
    
    var itemname = item.substring(6, (item.indexOf('$')-8));
  
    //forces the user to enter a rating between 1 and 5, and not leave the comment blank
    if (rating < 1 || rating > 5){
      alert ("Please enter a number between 1 and 5");
    }else if (comment ==""){
      alert ("Please enter a value for comment");
    }else{
      //uses addRating from the service to add the rating to the database
      if(confirm("Are you sure to you add this comment?")) {
        this._ratingdb.addRating(this.loggedinAcc, itemname, comment, rating);
        alert ("Added rating successfully");
      };
    };
    
  }
  
  
  
  addtoCart(item, quantity:number, index: number){
    
    //stores the index of the item added to the cart for later use
    this.shoppingIndexArr.push(index);
    
    //gets the name of the item using substring of the whole item string
    var nameString = item.substring(6, (item.indexOf('$')-8));
    
    var currentQuan = Number(this.itemQuantityArr[index]);
    
    //getting price
    var price = Number(item.substring((item.indexOf('$')+1), (item.indexOf('%')-8)));
    
    //getting tax
    var tax = Number(item.substring((item.indexOf('%')-2), (item.indexOf('%'))));
    
    
    //if the quantity is less than 1 or greater than the amount in stock, it asks the user to enter a valid quantity.
    if (quantity < 1 || quantity> currentQuan){
      alert ("Please enter a quantity between 1 and the current amount in stock.");
    }else{
      
      //calculating total price
      var totalPrice: number = (price*quantity);
      totalPrice = Math.round(totalPrice*100)/100;
      //calculating price after tax
      var priceAfterTax: number = (totalPrice + (totalPrice * tax/100));
      priceAfterTax = Math.round(priceAfterTax*100)/100;
      
      //put it into a string entry and push it to the array that holds all the shopping cart items
      var stringEntry = (nameString + ", Quantity: "+quantity +", Price: $"+ totalPrice + ", Price after Tax - $" +priceAfterTax);
      this.shoppingCart.push(stringEntry);
      
      //store the quantity of each shopping cart item for later use
      this.quantityShopArr.push(quantity.toString());
      
      //update the subtotal
      this.subtotal = Math.round((this.subtotal + priceAfterTax)*100)/100;
    }
    
  }
  
  
  
  
  deletefromCart(shop, index:number){
    
    //getting the price of the item
    var priceofItem = Number(shop.substring((shop.indexOf('-')+3),shop.length));
    
    //subtracting it from the subtotal
    this.subtotal = Math.round((this.subtotal - priceofItem)*100)/100;
    
    //removing the entry from the shopping cart array that is displayed on screen
    this.shoppingCart.splice(index,1);
    this.quantityShopArr.splice(index,1);
    this.shoppingIndexArr.splice(index,1);
  }
  
  
  
  clearCart(){
    
    if(confirm("Are you sure to you want to clear the cart?")) {
      this.quantityShopArr = [];
      this.shoppingCart = [];
      this.shoppingIndexArr = [];
      this.subtotal = 0;
    };
    //empties the arrays needed to manage the shopping cart and resets the subtotal
    
  }
  
  
  
  buy(){

   if(confirm("Are you sure to you want buy these items?")) {
    
    var receiptEntry:string = "";
    
    //for loop the length of how many items are in the shopping cart
    for (var i = 0; i < this.shoppingCart.length; i++){
      //gets the item name and quantity of the individual shopping cart entry
      var stringEntry = this.shoppingCart[i];
      var itemName = stringEntry.substring(0, (stringEntry.indexOf(',')));
      
      var itemQuantity = this.quantityShopArr[i];
    
      //gets the new quantity of the item by subtracting the old quantity stored in an array, with the quantity in the shopping cart
      var newQuantity = Number(this.itemQuantityArr[this.shoppingIndexArr[i]]) - Number(itemQuantity);
      var newQuantitySt = newQuantity.toString();
      
      //gets the new sales of the item by adding the old sales stored in an array with the quantity in the shopping cart
      var newSales = Number(this.itemSalesArr[this.shoppingIndexArr[i]]) + Number(itemQuantity);
      var newSalesSt = newSales.toString();
      
      //adding values to the receipt
      if (i == 0){
        receiptEntry = "[" + stringEntry + "] ";
      }else{
        receiptEntry = receiptEntry + "[" + stringEntry + "] ";
      };
      
      
      //updates the quantity and sales in the database of the item 
      this._itemdb.updateItemQuantity(itemName,newQuantitySt);
      this._itemdb.updateItemSales(itemName, newSalesSt);
      
      //does this for each item in the shopping cart
    };
    
    //shows the user the receipt
    alert (" Your Receipt: " + receiptEntry + " Subtotal = $" + this.subtotal);
    
    setTimeout(() => {
    
    //reloads the page to update the catalog based on the new database quantities and sales of items
    window.location.reload();
    
    }, 2000);
    
   };
  }
  
  
  
  addtoCollection(item, index: number, quan: number){
    
    var currentQuan = Number(this.itemQuantityArr[index]);
    if (quan < 1 || quan> currentQuan){
      alert ("Please enter a quantity between 1 and the current amount in stock.");
    }else{
    
      //gets the name of the item
      var nameString = item.substring(6, (item.indexOf('$')-8));
    
      //gets the description of the item from the entry
      var desc = this._itemdb.getDesc(nameString);
      //creates a string entry
      var stringEntry = (nameString +", Quantity " +quan );
      //pushes it to the array that shows the unsaved collection at the bottom of the screen
      this.unsavedColl.push(stringEntry);
    
    }
  }
  
  
  deletefromCollection(index: number){
    //removes from the unsaved collection
    this.unsavedColl.splice(index,1);
  }
  
  
  saveCollection(collectionName: string, collectionDesc:string, isPubStr:string){
    
    var isPublic: boolean = false;
    
    //forces the user to enter a name for the collection and specify if it is public or not
    if(collectionName == ""){
      alert ("Please enter a name for the collection");
    } else if (isPubStr != "yes" && isPubStr !="no"){
      alert ("Please enter 'yes' or 'no' to determine whether the collection is public or not.");
    } else {
      
      var stringEntry = "";
      
      if(isPubStr == 'yes'){
        isPublic = true;
      }else if (isPubStr =='no'){
        isPublic = false;
      };
      
      //pushes all of the unsaved collection into a single string that is stored in the database
      for (var i = 0; i < this.unsavedColl.length; i++){
        
        if(i == 0){
          stringEntry = ("["+ this.unsavedColl[i] + "], ");
        }else if(i==this.unsavedColl.length-1){
          stringEntry = (stringEntry + "[" + this.unsavedColl[i] + "] ");
        }else{
          stringEntry = (stringEntry + "[" + this.unsavedColl[i] + "], ");
        };
        
      };
    
    //calls the function in the service that stores the collection in the database  
    this._collectiondb.saveCollection(this.loggedinAcc, collectionName, collectionDesc, isPublic, stringEntry);
    
    this.unsavedColl = [];
    window.location.reload();
      
    };
    
  }
  
  renameCollection(newname: string, name){
    
    var prevname = name.substring((name.indexOf(':')+2), (name.indexOf(',')));

    this._collectiondb.updateCollName(prevname,newname);
    
    window.location.reload();
    
  }
  
  
  newDesc(newdesc: string, name){
    
    console.log ("test")
    
    var prevname = name.substring((name.indexOf(':')+2), (name.indexOf(',')));
    this._collectiondb.updateCollDesc(prevname, newdesc);
    
    window.location.reload();
  }
  
  
  
  toggleP(name){
    var prevname = name.substring((name.indexOf(':')+2), (name.indexOf(',')));
    var isPub = name.substring((name.indexOf(',')+2), (name.length -11));
    
    if (isPub == "Private"){
      var newPub = true;
    }else if (isPub == "Public"){
      var newPub = false;
    };
    
    this._collectiondb.updateCollPublic(prevname,newPub);
    
    window.location.reload();
  }
  
  
  deleteCollection(name){
    var prevname = name.substring((name.indexOf(':')+2), (name.indexOf(',')));
    this._collectiondb.deleteCollection(prevname);
    
    window.location.reload();
  }
  
  
  updateCartQuantity(shop, quantity: number, index:number){
    
    var itemName = shop.substring(0, (shop.indexOf(',')));
    
    var amountInStock =   Number(this.itemQuanDict[itemName]);

    
    if (quantity < 1){
      alert ("Please enter a quantity greater than 1");
    }else if(quantity>amountInStock){
      alert ("Please enter a quantity less than the amount in stock");
    }else{
      
      var firstHalf = shop.slice(0,shop.indexOf(':')+1);
      
      var price = this.itemPriceDict[itemName];
      
      var totalPrice = price * quantity;
      totalPrice = Math.round(totalPrice*100)/100;
      
      var tax = this.itemTaxDict[itemName];
      
      var newPriceAfterTax: number = (totalPrice + (totalPrice * tax/100));
      newPriceAfterTax = Math.round(newPriceAfterTax*100)/100;
      
      var oldPriceAfterTax = Number(shop.substring(shop.indexOf("-")+3,shop.length));
      
      var difference = newPriceAfterTax - oldPriceAfterTax;
      
      var stringEntry = firstHalf + " " + quantity + ", Price: $" +totalPrice+ ", Price after Tax - $" +newPriceAfterTax;
      
      
      this.quantityShopArr[index] = quantity.toString();
      this.shoppingCart[index] = stringEntry;
      
      this.subtotal = this.subtotal + difference;
      this.subtotal = Math.round(this.subtotal*100)/100;
    }
    
  }
  
  toCopyright(){
    this._router.navigateByUrl('/authpolicy/'+this.loggedinAcc);
  }
  
  //When the user clicks log out
  backToHome() {

    //goes back to the homepage, and resets the username stored in the string
    this._router.navigateByUrl('');
  }
  
}
