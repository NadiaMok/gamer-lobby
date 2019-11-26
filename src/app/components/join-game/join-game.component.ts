import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from './../../shared/api.service';
import { Player } from 'src/app/shared/player';

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
  id = this.actRoute.snapshot.paramMap.get('id');

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
    this.playerForm = new FormGroup({
      player: new FormControl(),
      rank: new FormControl(),
      score: new FormControl(),
      time: new FormControl(),
      status: new FormControl(), // ![data.status],
      favouriteGame: new FormControl(), /* random within the data.gamesPlayed range*/
      GAMES: new FormControl(null, Validators.required)
    });
    this.playerApi.GetPlayer(this.id).subscribe(data => {
      this.playerForm.patchValue(data);
      this.playerForm.patchValue({favouriteGame: data.gamesPlayed[Math.floor(Math.random() * data.gamesPlayed.length)]});
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update */
  updatePlayerForm() {
    console.log(this.playerForm.value);
    console.log(this.playerForm.controls.GAMES.value);
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (this.playerForm.valid) {
      if (this.playerForm.controls.GAMES.value) {
        this.playerForm.patchValue({status: false});
      }
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe(res => this.router.navigateByUrl('/player-rankings'));
    }
  }
}
