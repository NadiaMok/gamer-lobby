import { Player } from './../../shared/player';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-rankings',
  templateUrl: './player-rankings.component.html',
  styleUrls: ['./player-rankings.component.css']
})

export class PlayerRankingsComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] =  ['player', 'rank', 'score', 'time', 'status', 'gamesPlayed'];

  constructor(private playerApi: ApiService, private router: Router) {
    this.playerApi.GetPlayers().subscribe(data => {
      this.PlayerData = data;
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    // tabs
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
   }

  deletePlayer(index: number, e) {
    if (window.confirm('Are you sure you want to delete this player?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.playerApi.DeletePlayer(e._id).subscribe();
    }
  }
}
