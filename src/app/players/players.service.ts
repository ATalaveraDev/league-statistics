import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class PlayersService {
  standingsSubject = new ReplaySubject<any>();
  standings$ = this.standingsSubject.asObservable();

  txarloTeamSubject: ReplaySubject<any>;
  txarloTeam$: Observable<any>;
  yerbinhoTeamSubject: ReplaySubject<any>;
  yerbinhoTeam$: Observable<any>;
  pumpkinTeamSubject: ReplaySubject<any>;
  pumpkinTeam$: Observable<any>;

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.txarloTeamSubject = new ReplaySubject<any>();
    this.txarloTeam$ = this.txarloTeamSubject.asObservable();
    this.yerbinhoTeamSubject = new ReplaySubject<any>();
    this.yerbinhoTeam$ = this.yerbinhoTeamSubject.asObservable();
    this.pumpkinTeamSubject = new ReplaySubject<any>();
    this.pumpkinTeam$ = this.pumpkinTeamSubject.asObservable();

    this.headers = new HttpHeaders({Authorization: 'Bearer 471f92412e69226a87f489c4dfa90a93'});
  }

  getStandings() {
    return this.http.get('http://localhost:8080/api/fixtures/standings');
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
    return this.http.get('https://api-game.laligafantasymarca.com/api/1/team/' + team + '/lineup/23', {headers: this.headers});
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
}
