import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from './players.service';

@Component({
  selector: 'app-players',
  templateUrl: 'players.component.html'
})
export class PlayersComponent implements OnInit {
  id = 'chart1';
  width = 800;
  height = 400;
  type = 'msline';
  dataFormat = 'json';
  dataSource;

  scores: Array<any>;

  constructor(private route: ActivatedRoute, public playersSrv: PlayersService) {
    this.playersSrv.getResults();
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
    this.playersSrv.getLivePoints();
  }
}
