import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PoliciesService} from '../policies.service';


@Component({
  selector: 'app-dmcatools',
  templateUrl: './dmcatools.component.html',
  styleUrls: ['./dmcatools.component.css'],
  providers: [PoliciesService]
})
export class DmcatoolsComponent implements OnInit {
  
  requestArr: string[] = [];
  noticeArr: string[] = [];
  disputeArr: string[] = [];
  

  constructor(private _router: Router, private _pol: PoliciesService) { }

  ngOnInit() {
    //makes the service get the requests, notices and disputes
    this._pol.getRequests();
    this._pol.getNotices();
    this._pol.getDisputes();
    
    //waits for the http response
    setTimeout(() => {
      //sets the request array, notice array, and dispute array to what is retreived by the service
      this.requestArr = this._pol.getRequestsArr();
      this.noticeArr = this._pol.getNoticesArr();
      this.disputeArr = this._pol.getDisputesArr();
    }, 1000);
    
  }
  
  //routes back to the manager page when the back button is clicked
  back(){
    this._router.navigateByUrl('/manager');
  }
  
  
  //function for adding a request
  addReq(requestData: string){
    
    //sets the type to request
    var type = "Request";
    
    //passes in the type and data to the service function that handles the http post request
    this._pol.createDMCA(type, requestData);
    
    //reloads the window to show the updated list of requests.
    setTimeout(() => {
      window.location.reload();
    }, 1000);  
    
  }
  
  
  //function for adding notice (works the exact same as addReq)
  addNot(noticeData: string){
    
    var type = "Notice";
    
    this._pol.createDMCA(type, noticeData);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);  
    
  }
  
  
  //function for adding dispute (wors the exact same as addReq)
  addDis(disputeData: string){
    
    var type = "Dispute";
    
    this._pol.createDMCA(type, disputeData);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);  
    
  }
  
  
}
