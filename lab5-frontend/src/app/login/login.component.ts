import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  
  loginUser(username: string, password: string) {
    //validation by checking the backend to see if the log in credentials are correct
    this._router.navigateByUrl('/Auth');
  }

  backToHome() {
    this._router.navigateByUrl('');
  }
  
}
