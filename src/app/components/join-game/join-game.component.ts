import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  game = ' --- ';
  GAMES: Array<string>;

  constructor(private router: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

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

    // this._activatedRoute.params.subscribe((data) => {
    //   this.id = data.id;
    //   console.log(this.id);

    // });
    // this._movieService.getMovie(this.id).subscribe((movie) => {
    //   console.log(movie)
    //   this.mov = movie[0];
    //   this.populateForm(movie[0]);
    // })

    // populateForm(movie) {
    //   this.editForm =  this._formBuilder.group({
    //     title: new FormControl(movie.title, Validators.required),
    //     runningTime: new FormControl(movie.runningTime, [Validators.required, Validators.min(10)]),
    //     director: new FormControl(movie.director, [Validators.required, Validators.minLength(3)]),
    //     rating: new FormControl(movie.rating, [Validators.required, Validators.min(0), Validators.max(5)]),
    //     genre: new FormControl(movie.genre, Validators.required),
    //     status: new FormControl(movie.status)
    //   })
    // }
    // onSubmit() {
    //   let videoDocument = this.editForm.value;
    //   videoDocument['_id'] = this.mov._id;
    //   this._movieService.updateMovie(this.editForm.value).subscribe((data) => {
    //     if (data['error']){
    //       console.log(data['error'])
    //     }
    //     this._router.navigate(['./admin']);
    //   })
    // }
  }
}
