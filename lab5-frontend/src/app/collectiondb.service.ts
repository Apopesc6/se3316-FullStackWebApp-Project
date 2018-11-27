import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectiondbService {

  constructor(private httpClient: HttpClient) { }
  
  saveCollection(username: string, collectionname: string, isPublic: boolean, collectiondata: string){
    
    this.httpClient.post(`api/CollectionDatabase/createCollection`, {
      //using the values passed in
      userName: username,
      collectionName: collectionname,
      collectionData: collectiondata,
      isPublic: isPublic
      
    })
    .subscribe(
      (data:any[]) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
}
