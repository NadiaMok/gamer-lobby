import { Component, OnInit } from '@angular/core';
import { Player } from './../../shared/player';
import { ApiService } from './../../shared/api.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css']
})
export class ListGameComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;


  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Players',
        link: '/list-player',
        index: 0
      }, {
        label: 'Games',
        link: '/list-game',
        index: 1
      }
      ];

  }

  ngOnInit() {
    // tabs
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
   }
}
