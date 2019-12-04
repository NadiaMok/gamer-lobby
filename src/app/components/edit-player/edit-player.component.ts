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
    });
    this.playerApi.GetPlayer(this.id).subscribe(data => {
      this.playerForm.patchValue(data);
      // this.playerForm.patchValue({favouriteGame: data.gamesPlayed[Math.floor(Math.random() * data.gamesPlayed.length)]});
    });

    /*
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.studentApi.GetPlayer(id).subscribe(data => {
      console.log(data.subjects);
      this.subjectArray = data.subjects;
      this.playerForm = this.fb.group({
        player: [data.player, [Validators.required]],
        studentEmail: [data.studentEmail, [Validators.required]],
        section: [data.section, [Validators.required]],
        subjects: [data.subjects],
        dob: [data.dob, [Validators.required]],
        gender: [data.gender]
      });
    });
    */
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
    this.updatePlayerForm();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  updatePlayerForm() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (this.playerForm.valid) {
      if (window.confirm('Are you sure you want to update?')) {
        this.playerForm.patchValue({status: false});
        this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/player-rankings'));
        });
      }
    }
  }
}
