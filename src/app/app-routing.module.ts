import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'player-rankings' },
  { path: 'player-rankings', component: PlayerRankingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
