import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointsRoutingModule } from './points.routing.module';
import { PointsComponent } from './points.component';
import { PlayersService } from '../charts/players.service';
import { PlayerPointsComponent } from './player-points/player-points.component';

@NgModule({
  imports: [
    CommonModule,
    PointsRoutingModule
  ],
  declarations: [
    PlayerPointsComponent,
    PointsComponent
  ],
  providers: [PlayersService]
})
export class PointsModule { }
