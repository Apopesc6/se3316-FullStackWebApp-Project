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
  
  //when the back button is clicked, routes back to the manager page.
  backtoManager(){
    this._router.navigateByUrl('/manager');
  }

}
