import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../admin.service';

@Component({
  selector: 'app-register-fixture',
  templateUrl: 'register-fixture.component.html'
})
export class RegisterFixtureComponent implements OnInit {
  fixtures: Array<string>;
  fixtureForm: FormGroup;

  constructor(private adminSrv: AdminService) {
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

    this.adminSrv.editFixture(fixture);
    this.fixtureForm.reset();
  }
}
