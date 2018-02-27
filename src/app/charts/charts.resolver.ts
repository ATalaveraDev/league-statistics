import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { StandingsService } from './standings.service';

@Injectable()
export class ChartsResolver implements Resolve<any> {
  constructor(private standingsSrv: StandingsService) { }

  resolve(): Observable<any> {
    return this.standingsSrv.getStandings().map((data) => data);
  }
}
