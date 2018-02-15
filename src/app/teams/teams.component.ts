import { Component } from '@angular/core';

import { PlayersService } from '../players/players.service';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.component.html'
})
export class TeamsComponent {
  constructor(public playersSrv: PlayersService) {
    this.playersSrv.getTeamMembers();
  }
}
