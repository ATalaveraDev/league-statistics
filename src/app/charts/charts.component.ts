import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.less']
})
export class ChartsComponent implements OnInit {
  width = 1300;
  height = 400;
  type = 'msline';
  dataFormat = 'json';
  dataSource;

  standingsDataSource: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSource = {
      chart: {
        caption: 'Historial de puntos',
        subCaption: '',
        theme: 'fint',
        paletteColors: '#0075c2,#1aaf5d, #ff0000'
      },
      categories: this.route.snapshot.data.pointsHistory.labels,
      dataset: this.route.snapshot.data.pointsHistory.dataset
    };

    this.standingsDataSource = {
      chart: {
        caption: 'Clasificación',
        subCaption: '',
        theme: 'fint',
        paletteColors: '#0075c2,#1aaf5d, #ff0000'
      },
      categories: this.route.snapshot.data.standings.labels,
      dataset: this.route.snapshot.data.standings.points
    };
  }
}
