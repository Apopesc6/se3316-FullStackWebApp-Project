"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RatingdbService = (function () {
    function RatingdbService(httpClient) {
        this.httpClient = httpClient;
        this.ratingArray = [];
    }
    RatingdbService.prototype.addRating = function (username, itemname, comment, rating) {
        console.log(username + " " + itemname + " " + comment + " " + rating);
        this.httpClient.post("api/RatingDatabase/createRating", {
            //using the values passed in
            userName: username,
            itemName: itemname,
            userComment: comment,
            userRating: rating
        })
            .subscribe(function (data) {
            console.log(data);
        });
    };
    //Gets all the ratings for a specific item
    RatingdbService.prototype.getRatings = function (itemname) {
        var _this = this;
        //clears the array each time the function is called.
        this.ratingArray = [];
        //uses get all ratings, and then compares the item name to the item name passed in
        this.httpClient.get("api/RatingDatabase/allRatings")
            .subscribe(function (data) {
            var database = JSON.parse(JSON.stringify(data));
            database.forEach(function (ratinginDatabase) {
                _this.Acc = ratinginDatabase.userName;
                _this.Name = ratinginDatabase.itemName;
                _this.Comm = ratinginDatabase.userComment;
                _this.Rate = ratinginDatabase.userRating;
                if (_this.Name == itemname) {
                    var stringEntry = (_this.Acc + ":  " + _this.Comm + " - " + _this.Rate + "/5, ");
                    _this.ratingArray.push(stringEntry);
                }
                ;
            });
        });
        return this.ratingArray;
    };
    RatingdbService.prototype.getRatingArrLength = function () {
        return this.ratingArray.length;
    };
    RatingdbService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RatingdbService);
    return RatingdbService;
}());
exports.RatingdbService = RatingdbService;
