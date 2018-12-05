import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectiondbService {
  
  private userCollNameArr:string[]=[];
  private userCollDataArr:string[]=[];
  private userCollDescArr:string[]=[];
  
  private pubCollNameArr:string[]=[];
  private pubCollDataArr:string[]=[];
  private pubCollDescArr:string[]=[];
  
  private collUser: string;
  private collName: string;
  private collDesc: string;
  private collData: string;
  private collPublic:boolean;
  
  constructor(private httpClient: HttpClient) { }
  
  saveCollection(username: string, collectionname: string, collectiondesc:string, isPublic: boolean, collectiondata: string){
    
    this.httpClient.post(`api/CollectionDatabase/createCollection`, {
      //using the values passed in
      userName: username,
      collectionName: collectionname,
      collectionData: collectiondata,
      collectionDesc: collectiondesc,
      isPublic: isPublic
      
    })
    .subscribe(
      (data:any[]) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  //getting collections based on the username
  getUserCollections(username: string){
    
     //clears the array each time the function is called.
    this.userCollNameArr = [];
    this.userCollDataArr = [];
    
    //uses get all ratings, and then compares the user name to the user name passed in
    this.httpClient.get(`api/CollectionDatabase/allCollections`)
    .subscribe(
      (data:any) => {
          var database = JSON.parse(JSON.stringify(data));
          database.forEach(ratinginDatabase => {
            this.collUser = ratinginDatabase.userName;
            this.collName = ratinginDatabase.collectionName;
            this.collDesc = ratinginDatabase.collectionDesc;
            this.collData = ratinginDatabase.collectionData;
            this.collPublic = ratinginDatabase.isPublic;
            
            if (this.collUser == username){ //if the user name is the same as the one passed in, it adds to an array
              
              if (this.collPublic == true){ //creates a string depending on if the collection is public or private.
                var stringEntry = ("Collection Name: " + this.collName +  ", Public Collection");
              }else{
                var stringEntry = ("Collection Name: " + this.collName +  ", Private Collection");
              };
              
              var descEntry = "Description: " +this.collDesc;
                
              var dataEntry = this.collData;
              
              //pushes all generated string values into their respective arrays.
              this.userCollDescArr.push(descEntry);
              
              this.userCollDataArr.push(dataEntry);
          
              this.userCollNameArr.push(stringEntry);
            };
            
          });
      }
      )
    
  }
  
  //returns the array of descriptions
  getUserCollectionsDescArr() :string[]{
    return this.userCollDescArr;
  }
  
  //returns the array of collection names
  getUserCollectionsNameArr(): string[]{
    return this.userCollNameArr;
  }
  
  //returns the array of collection data
  getUserCollectionsDataArr(): string[]{
    return this.userCollDataArr;
  }
  
  
  //for getting all public collections
  getPublicCollections(){
     //clears the array each time the function is called.
    this.pubCollNameArr = [];
    this.pubCollDataArr = [];
    
    //uses get all ratings
    this.httpClient.get(`api/CollectionDatabase/allCollections`)
    .subscribe(
      (data:any) => {
          var database = JSON.parse(JSON.stringify(data));
          database.forEach(ratinginDatabase => {
            this.collUser = ratinginDatabase.userName;
            this.collName = ratinginDatabase.collectionName;
            this.collDesc = ratinginDatabase.collectionDesc;
            this.collData = ratinginDatabase.collectionData;
            this.collPublic = ratinginDatabase.isPublic;
            
            if (this.collPublic == true){ //if the collection is public, then it adds saves the data
                
                //creates string entries
                var descEntry = "Description: " +this.collDesc;
                var stringEntry = ("User: " + this.collUser + ", Collection Name: " + this.collName);
                var dataEntry = this.collData;
                
                //pushes the string entries in their respective arrays
                this.pubCollDataArr.push(dataEntry);
                this.pubCollDescArr.push(descEntry);
                this.pubCollNameArr.push(stringEntry);
              
              
            };
            
          });
      }
      )
  }
  
  //returns the array of descriptions
  getPubCollectionsDescArr(): string[]{
    return this.pubCollDescArr;
  }
  
  //returns the array of collection names
  getPubCollectionsNameArr(): string[]{
    return this.pubCollNameArr;
  }
  
  //returns the array of collection data
  getPubCollectionsDataArr(): string[]{
    return this.pubCollDataArr;
  }
  
  
  //for updating if the collection is public
  updateCollPublic(name:string, ispub: boolean){
    
    //post request to the backend function updateCollPub() in Collection database
    this.httpClient.post(`api/CollectionDatabase/updateCollPub`, {
      //using the values passed in
      collName: name,
      collPub: ispub
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  
  //for updating the collection name (functions very similar to updateCollPublic)
  updateCollName(oldname:string, newname:string){
    
    this.httpClient.post(`api/CollectionDatabase/updateCollName`, {
      //using the values passed in
      oldName: oldname,
      newName: newname
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  //for updating the collection description (functions very similar to updateCollPublic)
  updateCollDesc(name:string, newdesc:string){
    
    this.httpClient.post(`api/CollectionDatabase/updateCollDesc`, {
      //using the values passed in
      collName: name,
      collDesc: newdesc
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  
  //for deleting the collection
  deleteCollection(name: string){
    
    //calls the delete function from the back end and passes in the name as a parameter in the request header
    this.httpClient.delete(`api/CollectionDatabase/deleteCollection/${name}`)
      .subscribe(
      (data:any[]) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  
}
