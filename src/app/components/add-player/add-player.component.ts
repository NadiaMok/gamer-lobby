import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../shared/api.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  playerForm: FormGroup;

  ngOnInit() {
    this.submitNewForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private playerApi: ApiService
  ) {}

  submitNewForm() {
    this.playerForm = this.fb.group({
      player: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      favouriteGame: ['', [Validators.required]],
      status:  ['', [Validators.required]]
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }
  // add 'games played' as an empty array
  submitPlayerForm() {
    if (this.playerForm.valid) {
      console.log('all good');
      this.playerForm.patchValue({gamesPlayed: []});
      this.playerApi.AddPlayer(this.playerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/list-player'));
      });
    } else {
      console.log('error');
    }
  }

}
