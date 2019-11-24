import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { LoginComponent } from './components/login/login.component';
import { JoinGameComponent } from './components/join-game/join-game.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'player-rankings' },
  { path: 'player-rankings', component: PlayerRankingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'join-game', component: JoinGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
