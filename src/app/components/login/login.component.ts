import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Player Rankings',
        link: '/player-rankings',
        index: 0
      }, {
        label: 'Admin',
        link: '/login',
        index: 1
      }
      ];
  }

  navLinks: any[];
  activeLinkIndex = -1;

  username: string;
  password: string;

  ngOnInit() {
    // tabs
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  // validation
  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
     // this.router.navigateByUrl('/list-player');
     this.router.navigate(['/list-player']);
    } else {
      alert('Invalid credentials!');
    }
  }
}