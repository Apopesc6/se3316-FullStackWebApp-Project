import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthenticatedpage',
  templateUrl: './unauthenticatedpage.component.html',
  styleUrls: ['./unauthenticatedpage.component.css']
})
export class UnauthenticatedpageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  backToHome() {
    this._router.navigateByUrl('');
  }
}
