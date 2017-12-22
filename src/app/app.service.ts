import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AppService {
  private playersSubject = new ReplaySubject<any>();
  players$ = this.playersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/api/players')
      .subscribe((players: Array<any>) => this.playersSubject.next(players));
  }
}
