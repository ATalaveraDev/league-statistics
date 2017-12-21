import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {
  lastFixtureSubject = new ReplaySubject<any>();
  lastFixture$ = this.lastFixtureSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  editFixture(fixture): void {
    this.http.post('http://localhost:8080/api/fixtures', fixture)
      .subscribe((result) => this.lastFixtureSubject.next(result));
  }

  getLastFixture(): void {
    this.http.get('http://localhost:8080/api/fixtures/last')
      .subscribe((response: any) => this.lastFixtureSubject.next({ players: response.results, name: response.name }));
  }
}
