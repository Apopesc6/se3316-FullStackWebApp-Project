import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {

  private policy: string;
  private dmca: string;
  private reqArr: string[] = [];
  private notArr: string[] = [];
  private disArr: string[] = [];

  constructor(private httpClient: HttpClient) { }
  
  
  createPol(newPolicy:string){
    
    this.httpClient.post(`api/DMCADatabase/createPolicy`, {
      //using the values passed in
      policy: newPolicy
      
    })
    .subscribe(
      (data:any[]) => {
          console.log(data);
      }
      )

  }
  
  getPolicy(){
    this.httpClient.get(`api/SecurityDatabase/getPolicy`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(policyinDatabase =>{
           this.policy = policyinDatabase.policy;
          
          
         });
        
      }
      )
  }
  
  getDMCA(){
    this.httpClient.get(`api/DMCADatabase/getPolicy`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(policyinDatabase =>{
           this.dmca = policyinDatabase.policy;
          
          
         });
        
      }
      )
  }
  
  
  updatePol(oldpol: string, newpol: string){
    this.httpClient.post(`api/SecurityDatabase/updatePolicy`, {
      //using the values passed in
      oldPol: oldpol,
      newPol: newpol
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  
  updateDMCA(oldpol: string, newpol: string){
    this.httpClient.post(`api/DMCADatabase/updatePolicy`, {
      //using the values passed in
      oldPol: oldpol,
      newPol: newpol
      
    })
    .subscribe(
      (data:any) => {
        //console.log(data);
          console.log(data);
      }
      )
    
  }
  
  getPolicyStr() : string{
    return this.policy;
  }
  
  getDMCAStr() : string{
    return this.dmca;
  }
  
  
  
  
  
  createDMCA(type: string, dmcadata: string){
    
    this.httpClient.post(`api/DMCAReqDatabase/createEntry`, {
      //using the values passed in
      entry: dmcadata,
      ReqType: type
      
    })
    .subscribe(
      (data:any[]) => {
          console.log(data);
      }
      )
    
  }
  
  
  getRequests(){
    this.httpClient.get(`api/DMCAReqDatabase/getEntries`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(entryinDatabase =>{
          var type = entryinDatabase.ReqType;
          var entry = entryinDatabase.entry;
          
          if (type == "Request"){
            this.reqArr.push(entry);
          }
          
         });
        
      }
      )
  }
  
  getRequestsArr(): string[]{
    return this.reqArr;
  }
  
  
  
  
  getNotices(){
    this.httpClient.get(`api/DMCAReqDatabase/getEntries`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(entryinDatabase =>{
          var type = entryinDatabase.ReqType;
          var entry = entryinDatabase.entry;
          
          if (type == "Notice"){
            this.notArr.push(entry);
          }
          
         });
        
      }
      )
  }
  
  getNoticesArr(): string[]{
    return this.notArr;
  }
  
  
  
  
  getDisputes(){
    this.httpClient.get(`api/DMCAReqDatabase/getEntries`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(entryinDatabase =>{
          var type = entryinDatabase.ReqType;
          var entry = entryinDatabase.entry;
          
          if (type == "Dispute"){
            this.disArr.push(entry);
          }
          
         });
        
      }
      )
  }
  
  getDisputesArr(): string[]{
    return this.disArr;
  }
  
  
  
}
