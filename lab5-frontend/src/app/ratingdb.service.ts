import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingdbService {
  
  private Acc: string;
  private Name: string;
  private Comm: string;
  private Rate: number;
  
  private ratingArray: string[] = [];
  

  constructor(private httpClient: HttpClient) { }
  
  
  //add rating for a specific item
  addRating(username: string, itemname: string, comment: string, rating: number){
    
    //http client post request to the backend function createRating() in RatingDatabase
    this.httpClient.post(`api/RatingDatabase/createRating`, {
      //using the values passed in
      userName: username,
      itemName: itemname,
      userComment: comment,
      userRating: rating
      
    })
    .subscribe(
      (data:any[]) => {
          console.log(data);
      }
      )
    
  }
  
  
  
  //Gets all the ratings for a specific item
  getRatings(itemname: string):string[]{
    
    //clears the array each time the function is called.
    this.ratingArray = [];
    
    //uses get all ratings, and then compares the item name to the item name passed in
    this.httpClient.get(`api/RatingDatabase/allRatings`)
    .subscribe(
      (data:any) => {
          var database = JSON.parse(JSON.stringify(data));
          database.forEach(ratinginDatabase => {
            this.Acc = ratinginDatabase.userName;
            this.Name = ratinginDatabase.itemName;
            this.Comm = ratinginDatabase.userComment;
            this.Rate = ratinginDatabase.userRating;
            
            if (this.Name == itemname){ //if the item name is the same as the one passed in, it adds to an array
                
              var stringEntry = (this.Acc+  ":  " +this.Comm+ " - " +this.Rate+ "/5, ");
          
              this.ratingArray.push(stringEntry);
            };
            
          });
      }
      )
      
      return this.ratingArray;
  }
  
  //returns array of ratings
  getRatingArrLength(): number{
    return this.ratingArray.length;
  }
  
}
