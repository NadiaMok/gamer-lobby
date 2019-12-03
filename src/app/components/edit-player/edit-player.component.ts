import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../shared/api.service';
import { Player } from 'src/app/shared/player';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  ranks: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  playerForm: FormGroup;
  gamesPlayed: Array<string>;
  id = this.actRoute.snapshot.paramMap.get('id');
  GAMES: Array<string>;

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
      GAMES: new FormControl(null, Validators.required)
    });
    this.playerApi.GetPlayer(this.id).subscribe(data => {
      this.playerForm.patchValue(data);
      this.playerForm.patchValue({favouriteGame: data.gamesPlayed[Math.floor(Math.random() * data.gamesPlayed.length)]});
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

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update = Add */
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
