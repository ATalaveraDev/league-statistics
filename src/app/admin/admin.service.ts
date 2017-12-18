import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {
  lastFixtureSubject = new ReplaySubject();

  lastFixture$ = this.lastFixtureSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  editFixture(fixture): void {
    this.http.post('http://localhost:8080/api/fixtures', fixture)
      .subscribe((result) => this.lastFixtureSubject.next(result));
  }
}
