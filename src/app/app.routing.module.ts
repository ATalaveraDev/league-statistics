import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: 'players',
    loadChildren: 'app/players/players.module#PlayersModule'
  },
  {
    path: 'teams',
    loadChildren: 'app/teams/teams.module#TeamsModule'
  },
  {
    path: 'points',
    loadChildren: 'app/points/points.module#PointsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
