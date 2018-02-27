import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from './players.service';
import { StandingsService } from './standings.service';

@Component({
  selector: 'app-players',
  templateUrl: 'players.component.html',
  styleUrls: ['players.component.less']
})
export class PlayersComponent implements OnInit {
  id = 'chart1';
  width = 800;
  height = 400;
  type = 'msline';
  dataFormat = 'json';
  dataSource;

  id2 = 'chart2';
  standingsDataSource: any;

  result = [
      {
        seriesname: 'Yerbinho',
        data: [{value: 0}, {value: 0}]
      },
      {
        seriesname: 'Txarlo Magno',
        data: [{value: 0}, {value: 0}]
      },
      {
        seriesname: 'The Pumpkin',
        data: [{value: 0}, {value: 0}]
      }
    ];

  constructor(private route: ActivatedRoute, public playersSrv: PlayersService, private standingsSrv: StandingsService) {
    this.playersSrv.getResults();
    this.standingsSrv.getClasification().subscribe((data: any) => {
      data.forEach((fixture: any) => {
        this.result[0].data.push({value: fixture.points[0].points});
        this.result[1].data.push({value: fixture.points[1].points});
        this.result[2].data.push({value: fixture.points[2].points});
      });
    });
  }

  ngOnInit(): void {
    this.dataSource = {
      chart: {
        caption: 'Historial de puntos',
        subCaption: '',
        theme: 'fint',
        paletteColors: '#0075c2,#1aaf5d, #ff0000'
      },
      categories: this.route.snapshot.data.standings.labels,
      dataset: this.route.snapshot.data.standings.dataset
    };

    this.standingsDataSource = {
      chart: {
        caption: 'Clasificación',
        subCaption: '',
        theme: 'fint',
        paletteColors: '#0075c2,#1aaf5d, #ff0000'
      },
      categories: this.route.snapshot.data.standings.labels,
      dataset: this.result
    };
  }
}
