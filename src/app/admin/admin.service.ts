import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';

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
    this.http.get('/api/fixtures/last')
      .subscribe((response: any) => this.lastFixtureSubject.next({ players: response.results, name: response.name }));
  }

  addTeamPlayer(player: any): void {
    const body = {
      soccerPlayer: {
        points: player.points,
        name: player.name,
        position: player.position
      }
    };

    this.http.post('/api/players/' + player.team + '/team/soccer-player', body)
      .subscribe();
  }
}
