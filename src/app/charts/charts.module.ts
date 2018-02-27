import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsRoutingModule } from './charts.routing.module';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { FusionChartsModule } from 'angular4-fusioncharts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';

import { ChartsComponent } from './charts.component';
import { StandingsService } from './standings.service';
import { PlayersService } from './players.service';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  imports: [
    CommonModule,
    FusionChartsModule,
    ChartsRoutingModule
  ],
  declarations: [ChartsComponent],
  providers: [
    StandingsService,
    PlayersService
  ]
})
export class ChartsModule { }
