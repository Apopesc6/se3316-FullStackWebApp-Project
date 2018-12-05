import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PoliciesService} from '../policies.service';

@Component({
  selector: 'app-userpolicies',
  templateUrl: './userpolicies.component.html',
  styleUrls: ['./userpolicies.component.css'],
  providers: [PoliciesService]
})
export class UserpoliciesComponent implements OnInit {
  
  currentPolicy:string;
  currentDMCA:string;
  loggedinAcc: string;
  
  constructor(private _router: Router, private _pol: PoliciesService) { }
  
  
  ngOnInit() {
    //calls the service to get the polices for security and dmca
    this._pol.getPolicy();
    this._pol.getDMCA();
    
    
    var url = this._router.url;
    //gets the username from the url of the page
    this.loggedinAcc = url.substring(12,url.length);
   
    setTimeout(() => {
      //sets the currently displayed policies from what was retrieved by the service.
      this.currentPolicy = this._pol.getPolicyStr();
      this.currentDMCA = this._pol.getDMCAStr();

    }, 1000);
    
  }
  
  //when back is clicked
  back(){
    //if it is an unauthenticated user, it routes back to the home screen
    if (this.loggedinAcc == ""){
      this._router.navigateByUrl('');
    //if it is an authenticated user, it routes back to the authenticated user page  
    }else{
      this._router.navigateByUrl('/Auth/'+this.loggedinAcc);
    }
    
  }
  

}
