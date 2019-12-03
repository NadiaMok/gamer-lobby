import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

export class Game {
  // tslint:disable-next-line:variable-name
  id: number;
  title: string;
  platform: string;
  genre: string;
  rating: string;
  publisher: string;
  release: string;
  status: boolean;

  constructor(id, title, platform, genre, rating, publisher, release, status) {
      this.id = id;
      this.title = title;
      this.platform = platform;
      this.genre = genre;
      this.rating = rating;
      this.publisher = publisher;
      this.release = release;
      this.status = status;
  }
}
const bioshock = new Game(0, 'Bioshock', 'PS4', 'Shooter', '10/10', '2K Games', '2007', true);
const amnesia = new Game(1, 'Amnesia: The Dark Descent', 'XBOX', 'Horror', '6/10', 'Frictional Games', '2010', true);
const tombRaider = new Game(2, 'Tomb Raider', 'XBOX', 'Adventure', '8/10', 'Core Design', '1996', true);
const falloutNV = new Game(3, 'Fallout NV', 'PC', 'Action', '9/10', 'Interplay Entertainment', '2010', true);
const fallout4 = new Game(4, 'Fallout 4', 'XBOX 360', 'Action', '7/10', 'Interplay Entertainment', '2015', true);
const portal = new Game(5, 'Portal', 'PC', 'Puzzle', '5/10', 'Valve', '2007', false);
const portal2 = new Game(6, 'Portal 2', 'PC', 'Puzzle', '8/10', 'Valve', '2011', true);
const superMario = new Game(7, 'Super Mario', 'Nintendo', 'Action', '9/10', 'Nintendo', '1981', false);
const gta4 = new Game(8, 'Grand Theft Auto IV', 'XBOX 360', 'Action', '8/10', 'Rockstar Games', '2008', true);
const deadSpace = new Game(9, 'Dead Space', 'PS4', 'Horror', '9/10', 'Electronic Arts', '2007', false);
const tetris = new Game(10, 'Tetris', 'Nintendo', 'Puzzle', '10/10', 'Frictional Games', '1984', true);

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css']
})
export class ListGameComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  GAMES: any = [];
  dataSource: MatTableDataSource<Game>;
  displayedColumns: string[] =  ['title', 'platform', 'genre', 'rating', 'publisher', 'release', 'status'];

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    this.GAMES = [bioshock, amnesia, tombRaider, fallout4, falloutNV, tetris, superMario, gta4, portal, portal2, deadSpace];
    this.dataSource = new MatTableDataSource<Game>(this.GAMES);

    // tabs
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
   }
}
