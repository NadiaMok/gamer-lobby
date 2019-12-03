import { Player } from './../../shared/player';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.component.html',
  styleUrls: ['./list-player.component.css']
})

export class ListPlayerComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] =  ['player', 'rank', 'score', 'time', 'status', 'gamesPlayed', 'update', 'delete'];


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
    if (window.confirm('Are you sure? You are making the developers sad :(')) {
      const data = this.dataSource.data;
      this.dataSource.data = data;
      this.playerApi.DeletePlayer(e._id).subscribe(); // does not update the page, I have to do it manually
    }
  }
}
