import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  username: string;
  password: string;

  ngOnInit() {
  }
  // validation
  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigateByUrl('/list-player');
    } else {
      alert('Invalid credentials!');
    }
  }
}
