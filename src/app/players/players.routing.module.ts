import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayersComponent } from './players.component';

const routes = [{ path: '', component: PlayersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
