import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { LoginComponent } from './components/login/login.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { ListPlayerComponent } from './components/list-player/list-player.component';
import { ListGameComponent } from './components/list-game/list-game.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'player-rankings' },
  { path: 'player-rankings', component: PlayerRankingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'join-game/:id', component: JoinGameComponent },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'edit-player/:id' , component: EditPlayerComponent},
  { path: 'list-player' , component: ListPlayerComponent},
  { path: 'list-game' , component: ListGameComponent},
  // page not found
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
