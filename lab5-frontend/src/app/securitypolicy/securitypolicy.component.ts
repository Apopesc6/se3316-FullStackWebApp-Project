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

  constructor(private _router: Router, private _pol: PoliciesService ) { }

  ngOnInit() {
    
    this._pol.getPolicy();
    this._pol.getDMCA();
    
    setTimeout(() => {
      this.currentPolicy = this._pol.getPolicyStr();
      this.currentDMCA = this._pol.getDMCAStr();

    }, 1000);  
  }
  
  back(){
    this._router.navigateByUrl('/manager');
  }
  
  updatePolicy(newPolicy:string){
    this._pol.updatePol(this.currentPolicy, newPolicy);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);  
    
  }
  
  
  updateDMCA(dmca:string){
    
    this._pol.updateDMCA(this.currentDMCA, dmca);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000); 
    
  }
  

}
