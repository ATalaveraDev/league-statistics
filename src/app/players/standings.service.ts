import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class StandingsService {
  standingsSubject: ReplaySubject<any>;
  standings$: Observable<any>;

  constructor(private http: HttpClient) {
    this.standingsSubject = new ReplaySubject<any>();
    this.standings$ = this.standingsSubject.asObservable();
  }

  getClasification(): Observable<any> {
    return this.http.get(environment.api + '/standings');
  }
}
