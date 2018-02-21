import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {
  lastFixtureSubject = new ReplaySubject<any>();
  lastFixture$ = this.lastFixtureSubject.asObservable();

  constructor(private http: HttpClient) { }

  editFixture(fixture): void {
    this.http.post('/api/fixtures', fixture)
      .subscribe((result) => this.lastFixtureSubject.next(result));
  }

  getLastFixture(): void {
    this.http.get(environment.api + '/fixtures/last')
      .subscribe((response: any) => this.lastFixtureSubject.next({ players: response.results, name: response.name }));
  }
}
