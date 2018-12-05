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
  
  
  //for creating a new DMCA policy
  createPol(newPolicy:string){
    
    //http client post to the DMCADatabase backend, uses the createPolicy function
    this.httpClient.post(`api/DMCADatabase/createPolicy`, {
      policy: newPolicy
      
    })
    .subscribe(
      (data:any[]) => {
          console.log(data);
      }
      )
  }
  
  //for getting the current security policy
  getPolicy(){
    
    //uses the getPolicy() function from SecurityDatabase (backend function)
    this.httpClient.get(`api/SecurityDatabase/getPolicy`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(policyinDatabase =>{
          //saves the policy in the private variable
           this.policy = policyinDatabase.policy;
         });
        
      }
      )
  }
  
  //for getting the current DMCA policy
  getDMCA(){
    //uses the getPolicy() function from DMCADatabase
    this.httpClient.get(`api/DMCADatabase/getPolicy`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(policyinDatabase =>{
          //saves the policy in a private variable
           this.dmca = policyinDatabase.policy;
         });
        
      }
      )
  }
  
  
  //for updating the security policy
  updatePol(oldpol: string, newpol: string){
    //post http request to the backend function updatePolicy() in SecurityDatabase
    this.httpClient.post(`api/SecurityDatabase/updatePolicy`, {
      //using the values passed in
      oldPol: oldpol,
      newPol: newpol
      
    })
    .subscribe(
      (data:any) => {
          console.log(data);
      }
      )
    
  }
  
  
  //for updating the dmca policy
  updateDMCA(oldpol: string, newpol: string){
    //post http request to the backend function updatePolicy() in DMCADatabase
    this.httpClient.post(`api/DMCADatabase/updatePolicy`, {
      //using the values passed in
      oldPol: oldpol,
      newPol: newpol
      
    })
    .subscribe(
      (data:any) => {
          console.log(data);
      }
      )
    
  }
  
  //returns the security and dmca policy as a string
  getPolicyStr() : string{
    return this.policy;
  }
  
  getDMCAStr() : string{
    return this.dmca;
  }
  
  
  //for creating a new dmca request, notice, or dispute
  createDMCA(type: string, dmcadata: string){
    
    //post http request to the backend function createEntry() in DMCAReqDatabase
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
  
  
  //for getting all dmca requests
  getRequests(){
    //get http request to the backend function getEntries() in DMCAReqDatabase
    this.httpClient.get(`api/DMCAReqDatabase/getEntries`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(entryinDatabase =>{
          var type = entryinDatabase.ReqType;
          var entry = entryinDatabase.entry;
          
          //stores only the entries of type "Request"
          if (type == "Request"){
            this.reqArr.push(entry);
          }
          
         });
        
      }
      )
  }
  
  //returns the array of requests
  getRequestsArr(): string[]{
    return this.reqArr;
  }
  
  
  //for getting all dmca notices
  getNotices(){
    //get http request to the backend function getEntries() in DMCAReqDatabase
    this.httpClient.get(`api/DMCAReqDatabase/getEntries`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(entryinDatabase =>{
          var type = entryinDatabase.ReqType;
          var entry = entryinDatabase.entry;
          
          //stores only the entries of type "Notice"
          if (type == "Notice"){
            this.notArr.push(entry);
          }
          
         });
        
      }
      )
  }
  
  //returns the array of notices
  getNoticesArr(): string[]{
    return this.notArr;
  }
  
  
  
  //for getting all dmca disputes
  getDisputes(){
    //get http request to the backend function getEntries() in DMCAReqDatabase
    this.httpClient.get(`api/DMCAReqDatabase/getEntries`)
    .subscribe(
      (data:any) => {
        var database = JSON.parse(JSON.stringify(data));
        
        database.forEach(entryinDatabase =>{
          var type = entryinDatabase.ReqType;
          var entry = entryinDatabase.entry;
          
          //stores only the entries of type "Dispute"
          if (type == "Dispute"){
            this.disArr.push(entry);
          }
          
         });
        
      }
      )
  }
  
  //returns array of disputes
  getDisputesArr(): string[]{
    return this.disArr;
  }
  
  
  
}
