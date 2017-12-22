import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayersComponent } from './players.component';
import { PlayersResolver } from './players.resolver';

const routes = [
  { path: '',
    component: PlayersComponent,
    resolve: { standings: PlayersResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PlayersResolver]
})
export class PlayersRoutingModule { }
