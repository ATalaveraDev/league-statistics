import { NgModule } from '@angular/core';

import { TeamsRoutingModule } from './teams.routing.module';
import { TeamsComponent } from './teams.component';
import { TeamComponent } from '../statistics/team.component';
import { PlayersService } from '../charts/players.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule
  ],
  declarations: [
    TeamComponent,
    TeamsComponent
  ],
  providers: [PlayersService]
})
export class TeamsModule { }
