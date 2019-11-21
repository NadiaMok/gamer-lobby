import { Component, OnInit } from '@angular/core';
import { GAMES } from '../../../../backend/model/Games.js';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  GAMES: any;
  selected = 'option2';

  constructor() { }

  ngOnInit() {
    console.log(GAMES);
  }

}
