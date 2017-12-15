import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-fixture',
  templateUrl: 'register-fixture.component.html'
})
export class RegisterFixtureComponent implements OnInit {
  fixtures: Array<string>;
  fixtureForm: FormGroup;

  constructor(private http: HttpClient) {
    this.fixtures = [];

    for (let i = 1; i < 39; i++) {
      this.fixtures.push('Jornada ' + i);
    }
  }

  ngOnInit(): void {
    this.fixtureForm = new FormGroup({
      name: new FormControl('', Validators.required),
      player1points: new FormControl('', Validators.required),
      player2points: new FormControl('', Validators.required),
      player3points: new FormControl('', Validators.required)
    });
  }

  onChangeFixtureSelector(val): void {

  }

  submitForm(): void {
    const fixture = {
      name: this.fixtureForm.value.name,
      results: [
        {
          playerName: 'Yerbinho',
          points: this.fixtureForm.value.player1points
        },
        {
          playerName: 'ThePumpkin',
          points: this.fixtureForm.value.player2points
        },
        {
          playerName: 'Txarlo Magno',
          points: this.fixtureForm.value.player3points
        },
      ]
    };

    this.http.post('http://localhost:8080/api/fixtures', fixture)
      .subscribe(() => this.fixtureForm.reset());
  }
}
