import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      status: new FormControl(),
      favouriteGame: new FormControl(),
      gamesPlayed: new FormControl(),
      GAMES: new FormControl(null, Validators.required)
    });
    this.playerApi.GetPlayer(this.id).subscribe(data => {
      this.playerForm.patchValue(data);
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update */
  updatePlayerForm() {
    // console.log('played: ' + this.playerForm.controls.gamesPlayed.value);
    // console.log('joined: ' + this.playerForm.controls.GAMES.value);
    console.log('new: ' + (this.playerForm.controls.gamesPlayed.value).push(this.playerForm.controls.GAMES.value));

    const id = this.actRoute.snapshot.paramMap.get('id');
    if (this.playerForm.valid) {
      if (this.playerForm.controls.GAMES.value) {
      this.playerForm.patchValue({status: false});
                                  // gamesPlayed: (this.playerForm.controls.gamesPlayed.value)
                                  // .push(this.playerForm.controls.GAMES.value)});
      }
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe(res => this.router.navigateByUrl('/player-rankings'));
    }
  }
}
