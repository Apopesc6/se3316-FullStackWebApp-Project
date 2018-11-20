import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticatedpage',
  templateUrl: './authenticatedpage.component.html',
  styleUrls: ['./authenticatedpage.component.css']
})
export class AuthenticatedpageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  
  backToHome() {
    this._router.navigateByUrl('');
  }
}
