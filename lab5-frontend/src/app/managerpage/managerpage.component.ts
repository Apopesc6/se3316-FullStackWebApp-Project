import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerpage',
  templateUrl: './managerpage.component.html',
  styleUrls: ['./managerpage.component.css']
})
export class ManagerpageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  
  backToHome() {
    this._router.navigateByUrl('');
  }
}
