import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PoliciesService} from '../policies.service';

@Component({
  selector: 'app-securitypolicy',
  templateUrl: './securitypolicy.component.html',
  styleUrls: ['./securitypolicy.component.css'],
  providers: [PoliciesService]
})
export class SecuritypolicyComponent implements OnInit {
  
  currentPolicy:string;
  currentDMCA:string;

  constructor(private _router: Router, private _pol: PoliciesService) { }

  ngOnInit() {
    
    //calls the service functions to get the dmca policy and security policy
    this._pol.getPolicy();
    this._pol.getDMCA();
    
    setTimeout(() => {
      //sets the policies displayed on screen to what was retrieved by the service.
      this.currentPolicy = this._pol.getPolicyStr();
      this.currentDMCA = this._pol.getDMCAStr();
    }, 1000);  
  }
  
  //routes back to the manager page when "back" is clicked
  back(){
    this._router.navigateByUrl('/manager');
  }
  
  //when the admin wants to update the security policy
  updatePolicy(newPolicy:string){
    //calls the service function that handles updating the policy
    this._pol.updatePol(this.currentPolicy, newPolicy);
    
    //reloads the window to show the updated policy
    setTimeout(() => {
      window.location.reload();
    }, 1000);  
    
  }
  
  //functions the same as updating the security policy.
  updateDMCA(dmca:string){
    
    this._pol.updateDMCA(this.currentDMCA, dmca);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000); 
    
  }
  

}
