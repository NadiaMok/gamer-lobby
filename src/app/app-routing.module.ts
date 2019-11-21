import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { LoginComponent } from './components/login/login.component';
import { ListPlayerComponent } from './components/list-player/list-player.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'player-rankings' },
  { path: 'player-rankings', pathMatch: 'full', component: PlayerRankingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list-player', component: ListPlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
