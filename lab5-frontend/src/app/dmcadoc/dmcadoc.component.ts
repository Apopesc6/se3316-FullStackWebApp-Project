import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dmcadoc',
  templateUrl: './dmcadoc.component.html',
  styleUrls: ['./dmcadoc.component.css'],
})
export class DMCAdocComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  
  backtoManager(){
    this._router.navigateByUrl('/manager');
  }

}
