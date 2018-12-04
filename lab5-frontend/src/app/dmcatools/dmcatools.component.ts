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
    
    this._pol.getRequests();
    this._pol.getNotices();
    this._pol.getDisputes();
    
    setTimeout(() => {
      this.requestArr = this._pol.getRequestsArr();
      this.noticeArr = this._pol.getNoticesArr();
      this.disputeArr = this._pol.getDisputesArr();

      
    }, 1000);
    
  }
  
  back(){
    this._router.navigateByUrl('/manager');
  }
  
  
  addReq(requestData: string){
    
    var type = "Request";
    
    this._pol.createDMCA(type, requestData);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);  
    
  }
  
  
  addNot(noticeData: string){
    
    var type = "Notice";
    
    this._pol.createDMCA(type, noticeData);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);  
    
  }
  
  
  addDis(disputeData: string){
    
    var type = "Dispute";
    
    this._pol.createDMCA(type, disputeData);
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);  
    
  }
  
  
}
