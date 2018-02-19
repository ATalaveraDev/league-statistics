import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { forEach } from '@angular/router/src/utils/collection';
import { environment } from '../../environments/environment';

@Injectable()
export class PlayersService {
  // endpoint para saber la pasta https://api-game.laligafantasymarca.com/api/1/league/01320484/ranking/23
  standingsSubject = new ReplaySubject<any>();
  standings$ = this.standingsSubject.asObservable();

  txarloTeamSubject: ReplaySubject<any>;
  txarloTeam$: Observable<any>;
  yerbinhoTeamSubject: ReplaySubject<any>;
  yerbinhoTeam$: Observable<any>;
  pumpkinTeamSubject: ReplaySubject<any>;
  pumpkinTeam$: Observable<any>;

  txarloLivePointsSubject: ReplaySubject<any>;
  txarloLivePoints$: Observable<any>;
  yerbinhoLivePointsSubject: ReplaySubject<any>;
  yerbinhoLivePoints$: Observable<any>;
  pumpkinLivePointsSubject: ReplaySubject<any>;
  pumpkinLivePoints$: Observable<any>;

  scoresSubject: ReplaySubject<any>;
  scores$: Observable<any>;

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.txarloTeamSubject = new ReplaySubject<any>();
    this.txarloTeam$ = this.txarloTeamSubject.asObservable();
    this.yerbinhoTeamSubject = new ReplaySubject<any>();
    this.yerbinhoTeam$ = this.yerbinhoTeamSubject.asObservable();
    this.pumpkinTeamSubject = new ReplaySubject<any>();
    this.pumpkinTeam$ = this.pumpkinTeamSubject.asObservable();

    this.txarloLivePointsSubject = new ReplaySubject<any>();
    this.txarloLivePoints$ = this.txarloLivePointsSubject.asObservable();
    this.yerbinhoLivePointsSubject = new ReplaySubject<any>();
    this.yerbinhoLivePoints$ = this.yerbinhoLivePointsSubject.asObservable();
    this.pumpkinLivePointsSubject = new ReplaySubject<any>();
    this.pumpkinLivePoints$ = this.pumpkinLivePointsSubject.asObservable();

    this.scoresSubject = new ReplaySubject<any>();
    this.scores$ = this.scoresSubject.asObservable();

    this.headers = new HttpHeaders({Authorization: 'Bearer 471f92412e69226a87f489c4dfa90a93'});
  }

  getStandings() {
    return this.http.get(environment.api + '/fixtures/standings');
  }

  getTeamMembers(): void {
    this.getTeam(1008589).subscribe((data: any) => {
      this.yerbinhoTeamSubject.next({
        goalkeepers: data.formation.goalkeeper,
        defenders: {
          members: data.formation.defender,
          best: this.getBestLineMember(data.formation.defender)
        },
        midfielders: {
          members: data.formation.midfield,
          best: this.getBestLineMember(data.formation.midfield)
        },
        strikers: {
          members: data.formation.striker,
          best: this.getBestLineMember(data.formation.striker)
        }
      });
    });
    this.getTeam(968709).subscribe((data: any) => {
      this.txarloTeamSubject.next({
        goalkeepers: data.formation.goalkeeper,
        defenders: {
          members: data.formation.defender,
          best: this.getBestLineMember(data.formation.defender)
        },
        midfielders: {
          members: data.formation.midfield,
          best: this.getBestLineMember(data.formation.midfield)
        },
        strikers: {
          members: data.formation.striker,
          best: this.getBestLineMember(data.formation.striker)
        }
      });
    });
    this.getTeam(969731).subscribe((data: any) => {
      this.pumpkinTeamSubject.next({
        goalkeepers: data.formation.goalkeeper,
        defenders: {
          members: data.formation.defender,
          best: this.getBestLineMember(data.formation.defender)
        },
        midfielders: {
          members: data.formation.midfield,
          best: this.getBestLineMember(data.formation.midfield)
        },
        strikers: {
          members: data.formation.striker,
          best: this.getBestLineMember(data.formation.striker)
        }
      });
    });
  }

  private getTeam(team: number): Observable<any> {
    return this.http.get('https://api-game.laligafantasymarca.com/api/1/team/' + team + '/lineup', {headers: this.headers});
  }

  private getBestLineMember(members: Array<any>): any {
    return members.slice().sort((playerA: any, playerB: any) => {
      if (playerA.points < playerB.points) {
        return 1;
      }
      if (playerA.points > playerB.points) {
        return -1;
      }

      return 0;
    })[0];
  }

  getResults(): void {
    this.http.get(environment.api + '/statistics/results').subscribe(data => this.scoresSubject.next(data));
  }

  getLivePoints(): void {
    this.http.get(environment.api + '/players/968709/points/live', {headers: new HttpHeaders({Bearer: '471f92412e69226a87f489c4dfa90a93'})})
      .subscribe((response => this.txarloLivePointsSubject.next(response)));
    this.http.get(environment.api + '/players/1008589/points/live', {headers: new HttpHeaders({Bearer: '471f92412e69226a87f489c4dfa90a93'})})
      .subscribe((response => this.yerbinhoLivePointsSubject.next(response)));
    this.http.get(environment.api + '/players/969731/points/live', {headers: new HttpHeaders({Bearer: '471f92412e69226a87f489c4dfa90a93'})})
      .subscribe((response => this.pumpkinLivePointsSubject.next(response)));
  }
}
