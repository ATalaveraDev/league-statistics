import { Component } from '@angular/core';
import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html'
})
export class PointsComponent {
  constructor(public playersSrv: PlayersService) {
    this.playersSrv.getLivePoints();
  }
}
