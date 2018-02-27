import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { PlayersResolver } from './players.resolver';
import { ChartsResolver } from './charts.resolver';

const routes = [
  {
    path: '',
    component: ChartsComponent,
    resolve: {
      standings: ChartsResolver,
      pointsHistory: PlayersResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
    PlayersResolver,
    ChartsResolver
  ]
})
export class ChartsRoutingModule { }
