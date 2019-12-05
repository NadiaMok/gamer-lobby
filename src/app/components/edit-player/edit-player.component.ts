import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../shared/api.service';
import { Player } from 'src/app/shared/player';

// player, rank, score, time, favourite game, status
@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  playerForm: FormGroup;

  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  gamesPlayed: Array<string>;
  GAMES: any = [
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

  ngOnInit() {
    this.updateNewForm();
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
      // console.log(data);
      // console.log(data.rank);
      // console.log(data.status);
      console.log(data.gamesPlayed);

      this.playerForm = this.fb.group({
        player: [data.player, [Validators.required]],
        rank: [(String)(data.rank), [Validators.required]],
        score: [data.score, [Validators.required]],
        time: [data.time, [Validators.required]],
        status: [(String)(data.status), [Validators.required]],
        favouriteGame: [(String)(data.favouriteGame), [Validators.required]],
        gamesPlayed: [data.gamesPlayed]
      });
    });
  }

  updateNewForm() {
    this.playerForm = this.fb.group({
      player: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      status: [true, [Validators.required]],
      favouriteGame: ['', [Validators.required]],
      gamesPlayed: [this.playerApi.GetPlayer(this.actRoute.snapshot.paramMap.get('id'))]
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  updatePlayerForm() {
    console.log(this.playerForm.value);

    const id = this.actRoute.snapshot.paramMap.get('id');
    if (this.playerForm.valid) {
      if (window.confirm('Are you sure you want to update?')) {
        this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/list-player'));
        });
      }
    }
  }
}
