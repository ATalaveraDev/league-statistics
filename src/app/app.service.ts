import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  players: Array<any>;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/api/players')
      .subscribe((players: Array<any>) => this.players = players);
  }
}
