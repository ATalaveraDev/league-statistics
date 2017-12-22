import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class PlayersService {
  standingsSubject = new ReplaySubject<any>();
  standings$ = this.standingsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getStandings() {
    return this.http.get('http://localhost:8080/api/fixtures/standings');
  }
}
