import { NgModule } from '@angular/core';

import { PointsRoutingModule } from './points.routing.module';
import { PointsComponent } from './points.component';
import { PlayersService } from '../players/players.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    PointsRoutingModule
  ],
  declarations: [PointsComponent],
  providers: [PlayersService]
})
export class PointsModule { }
