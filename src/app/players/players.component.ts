import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

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
  }
}
