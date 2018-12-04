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
  
  getUserCollections(username: string){
    
     //clears the array each time the function is called.
    this.userCollNameArr = [];
    this.userCollDataArr = [];
    
    //uses get all ratings, and then compares the item name to the item name passed in
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
            
            if (this.collUser == username){ //if the item name is the same as the one passed in, it adds to an array
              
              if (this.collPublic == true){
                var stringEntry = ("Collection Name: " + this.collName +  ", Public Collection");
              }else{
                var stringEntry = ("Collection Name: " + this.collName +  ", Private Collection");
              };
              
              var descEntry = "Description: " +this.collDesc;
                
              var dataEntry = this.collData;
              
              this.userCollDescArr.push(descEntry);
              
              this.userCollDataArr.push(dataEntry);
          
              this.userCollNameArr.push(stringEntry);
            };
            
          });
      }
      )
    
  }
  
  getUserCollectionsDescArr() :string[]{
    return this.userCollDescArr;
  }
  
  getUserCollectionsNameArr(): string[]{
    return this.userCollNameArr;
  }
  
  
  getUserCollectionsDataArr(): string[]{
    return this.userCollDataArr;
  }
  
  
  getPublicCollections(){
     //clears the array each time the function is called.
    this.pubCollNameArr = [];
    this.pubCollDataArr = [];
    
    //uses get all ratings, and then compares the item name to the item name passed in
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
            
            if (this.collPublic == true){ //if the item name is the same as the one passed in, it adds to an array
                
                var descEntry = "Description: " +this.collDesc;
                var stringEntry = ("User: " + this.collUser + ", Collection Name: " + this.collName);
                var dataEntry = this.collData;
                this.pubCollDataArr.push(dataEntry);
                this.pubCollDescArr.push(descEntry);
                this.pubCollNameArr.push(stringEntry);
              
              
            };
            
          });
      }
      )
  }
  
  
  getPubCollectionsDescArr(): string[]{
    return this.pubCollDescArr;
  }
  
  getPubCollectionsNameArr(): string[]{
    return this.pubCollNameArr;
  }
  
  
  getPubCollectionsDataArr(): string[]{
    return this.pubCollDataArr;
  }
  
  
  updateCollPublic(name:string, ispub: boolean){
    
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
  
  deleteCollection(name: string){
    
    
    this.httpClient.delete(`api/CollectionDatabase/deleteCollection/${name}`)
      .subscribe(
      (data:any[]) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  
}
