import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { PlayersService } from './players.service';

@Injectable()
export class PlayersResolver implements Resolve<any> {
  constructor(private playersSrv: PlayersService) { }

  resolve(): Observable<any> {
    return this.playersSrv.getStandings().map((data) => data);
  }
}
