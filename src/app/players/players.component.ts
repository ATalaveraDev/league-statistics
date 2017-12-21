import { Component, OnInit } from '@angular/core';

import { PlayersService } from './players.service';

@Component({
  selector: 'app-players',
  templateUrl: 'players.component.html',
  providers: [PlayersService]
})
export class PlayersComponent implements OnInit {
  id = 'chart1';
  width = 800;
  height = 400;
  type = 'msline';
  dataFormat = 'json';
  dataSource;

  constructor(public service: PlayersService) { }

  ngOnInit(): void {
    this.service.getStandings();
    this.service.standings$.subscribe((standings: any) => {
      this.dataSource = {
        chart: {
          caption: 'Clasificación histórica',
          subCaption: '',
          theme: 'fint',
          paletteColors: '#0075c2,#1aaf5d, #ff0000'
        },
        categories: standings.labels,
        dataset: standings.dataset
      };
    });
  }
}
