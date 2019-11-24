import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from './../../shared/api.service';
import { Player } from './../../shared/player';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  game = ' --- ';
  GAMES: Array<string>;
  playerForm: FormGroup;
  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] =  ['label', 'value'];

  constructor(private playerApi: ApiService, private router: Router, public fb: FormBuilder,
              private ngZone: NgZone, private actRoute: ActivatedRoute) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
    // this.GAMES = [
    //   'Bioshock',
    //   'Amnesia: The Dark Descent',
    //   'Tomb Raider',
    //   'Fallout NV',
    //   'Fallout 4',
    //   'Portal',
    //   'Portal 2',
    //   'Super Mario',
    //   'Grand Theft Auto V',
    //   'Dead Space',
    //   'Tetris'
    // ];
    this.PlayerData = data;
    this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
    });

  }

  ngOnInit() {
    this.GAMES = [
      'Bioshock',
      'Amnesia: The Dark Descent',
      'Tomb Raider',
      'Fallout NV',
      'Fallout 4',
      'Portal',
      'Portal 2',
      'Super Mario',
      'Grand Theft Auto V',
      'Dead Space',
      'Tetris'
    ];
  }

  updatePlayerForm() {
    console.log(this.playerForm.value);
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to join the game?')) {
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/player-rankings')); // STATUS UNAVAILABLE, then navigate to player rangind
      });
    }
  }
}
