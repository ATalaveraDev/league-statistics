import { Component } from '@angular/core';
import { PlayersService } from '../charts/players.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['points.component.less']
})
export class PointsComponent {
  constructor(public playersSrv: PlayersService) {
    this.playersSrv.getLivePoints();
  }
}
