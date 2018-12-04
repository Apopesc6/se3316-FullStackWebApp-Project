import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {

  private policy: string;
  private dmca: string;

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
  
  
}
