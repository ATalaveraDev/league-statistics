import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players.routing.module';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { PlayersService } from './players.service';
import { TeamsComponent } from './teams/teams.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [
    CommonModule,
    PlayersRoutingModule,
    FusionChartsModule
  ],
  declarations: [
    PlayersComponent,
    TeamsComponent
  ],
  providers: [PlayersService]
})
export class PlayersModule {
}
