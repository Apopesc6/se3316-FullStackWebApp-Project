"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ItemdbService = (function () {
    function ItemdbService(httpClient) {
        this.httpClient = httpClient;
        this.Price = '';
        this.Tax = '';
        this.Quantity = '';
        this.Name = '';
        this.Description = '';
        this.AmountPurchased = '';
        //Array for each item entry
        this.itemArray = [];
        //stores the description for each item in a dictionary so it can be easily accessed by key later on.
        this.descArr = {};
        this.buyNo = [];
        this.buyNoDict = {};
    }
    ItemdbService.prototype.getItems = function () {
        var _this = this;
        this.httpClient.get("api/ItemDatabase/allItems")
            .subscribe(function (data) {
            var database = JSON.parse(JSON.stringify(data));
            //sets the values retrieved from the server to the variables in the service
            database.forEach(function (iteminDatabase) {
                _this.Name = iteminDatabase.itemName;
                _this.Price = iteminDatabase.itemPrice;
                _this.Tax = iteminDatabase.itemTax;
                _this.Quantity = iteminDatabase.itemQuantity;
                _this.Description = iteminDatabase.itemDesc;
                _this.AmountPurchased = iteminDatabase.itemBuyNo;
                //dictionary used to store each description for each specific item name
                _this.descArr[_this.Name] = _this.Description;
                //convert the amount purchased retrieved from the database into a string
                var amountPurchasedInt = parseInt(_this.AmountPurchased);
                //push the amount bought into an array
                _this.buyNo.push(amountPurchasedInt);
                //Adds each item into a single string
                var stringEntry = ("Name: " + _this.Name + " Price: $" + _this.Price + " Tax: " + _this.Tax + "% Quantity: " + _this.Quantity + " # of Buys: " + _this.AmountPurchased);
                //add a dictionary entry with the amount bought as the index, and the whole string entry
                _this.buyNoDict[amountPurchasedInt] = stringEntry;
                //this.itemArray.push(stringEntry);
            });
        });
        //wait 0.5s to get the http response back
        setTimeout(function () {
            //create a new array that sorts the array of amounts bought
            var sortedPurchases = _this.buyNo.sort(function (n1, n2) { return n1 - n2; });
            //pushes the string entries in order of which item is bought the most with the use of the dictionary and the sorted amount array
            for (var i = sortedPurchases.length - 1; i >= 0; i--) {
                _this.itemArray.push(_this.buyNoDict[sortedPurchases[i]]);
            }
        }, 1000);
        return this.itemArray;
    };
    //used by the manager to add items to the catalog
    ItemdbService.prototype.addItem = function (name, quantity, price, tax, description, purchases) {
        this.httpClient.post("api/ItemDatabase/createItem", {
            //using the values passed in
            itemName: name,
            itemQuantity: quantity,
            itemPrice: price,
            itemTax: tax,
            itemDesc: description,
            itemBuyNo: purchases
        })
            .subscribe(function (data) {
            //console.log(data);
            console.log(data);
        });
    };
    ItemdbService.prototype.getDesc = function (itemDescName) {
        //Requires the name which acts as the key (used to find the description)
        //Gets the item description from the dictionary
        var Desc = this.descArr[itemDescName];
        return Desc;
    };
    ItemdbService.prototype.getItemArraySize = function () {
        return this.itemArray.length;
    };
    ItemdbService.prototype.updateItemQuantity = function (name, quantity) {
        this.httpClient.post("api/ItemDatabase/updateItemQuantity", {
            //using the values passed in
            itemName: name,
            itemQuantity: quantity
        })
            .subscribe(function (data) {
            //console.log(data);
            console.log(data);
        });
    };
    ItemdbService.prototype.updateItemTax = function (name, tax) {
        this.httpClient.post("api/ItemDatabase/updateItemTax", {
            //using the values passed in
            itemName: name,
            itemTax: tax
        })
            .subscribe(function (data) {
            //console.log(data);
            console.log(data);
        });
    };
    ItemdbService.prototype.updateItemPrice = function (name, price) {
        this.httpClient.post("api/ItemDatabase/updateItemPrice", {
            //using the values passed in
            itemName: name,
            itemPrice: price
        })
            .subscribe(function (data) {
            //console.log(data);
            console.log(data);
        });
    };
    ItemdbService.prototype.updateItemDesc = function (name, desc) {
        this.httpClient.post("api/ItemDatabase/updateItemDesc", {
            //using the values passed in
            itemName: name,
            itemDesc: desc
        })
            .subscribe(function (data) {
            //console.log(data);
            console.log(data);
        });
    };
    ItemdbService.prototype.updateItemName = function (oldname, newname) {
        this.httpClient.post("api/ItemDatabase/updateItemName", {
            //using the values passed in
            newName: newname,
            oldName: oldname
        })
            .subscribe(function (data) {
            //console.log(data);
            console.log(data);
        });
    };
    ItemdbService.prototype.updateItemSales = function (name, sales) {
        this.httpClient.post("api/ItemDatabase/updateItemSales", {
            //using the values passed in
            itemName: name,
            itemBuyNo: sales
        })
            .subscribe(function (data) {
            //console.log(data);
            console.log(data);
        });
    };
    ItemdbService.prototype.deleteItem = function (name) {
        this.httpClient.delete("api/ItemDatabase/deleteItem/" + name)
            .subscribe(function (data) {
            //console.log(data);
            console.log(data);
        });
    };
    ItemdbService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ItemdbService);
    return ItemdbService;
}());
exports.ItemdbService = ItemdbService;
