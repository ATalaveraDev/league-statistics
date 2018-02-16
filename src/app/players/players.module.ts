import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players.routing.module';
import { PlayersService } from './players.service';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [
    CommonModule,
    PlayersRoutingModule,
    FusionChartsModule
  ],
  declarations: [PlayersComponent],
  providers: [PlayersService]
})
export class PlayersModule { }
