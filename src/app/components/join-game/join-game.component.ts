import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from './../../shared/api.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  playerForm: FormGroup;
  GAMES: Array<string>;
  gamesPlayed: Array<string>;

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

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
      this.playerForm = this.fb.group({
        player: [data.player],
        rank: [data.rank],
        score: [data.score],
        time: [data.time],
        status: [data.status],
        favouriteGame: [data.gamesPlayed[Math.floor(Math.random() *
          data.gamesPlayed.length)]], /* random within the data.gamesPlayed range*/
        GAMES: [this.GAMES, [Validators.required]]
      });
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update */
  updatePlayerForm() {
    console.log(this.playerForm.value);
    const id = this.actRoute.snapshot.paramMap.get('id');
    // this.playerApi.GetPlayer(id).subscribe(data => {
    //   console.log(data.status);
    // });
    if (window.confirm('Are you sure you want to update?')) {
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/player-rankings'));
      });
    }
  }
}
