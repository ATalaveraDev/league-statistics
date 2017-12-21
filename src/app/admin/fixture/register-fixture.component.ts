import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../admin.service';

@Component({
  selector: 'app-register-fixture',
  templateUrl: 'register-fixture.component.html',
  providers: [AdminService]
})
export class RegisterFixtureComponent implements OnInit {
  fixtures: Array<string>;
  fixtureForm: FormGroup;

  constructor(public adminSrv: AdminService) {
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

    this.adminSrv.getLastFixture();
  }

  onChangeFixtureSelector(val): void {

  }

  submitForm(): void {
    const fixture = {
      name: this.fixtureForm.value.name,
      results: [
        {
          name: 'Yerbinho',
          points: this.fixtureForm.value.player1points
        },
        {
          name: 'ThePumpkin',
          points: this.fixtureForm.value.player2points
        },
        {
          name: 'Txarlo Magno',
          points: this.fixtureForm.value.player3points
        }
      ]
    };

    this.adminSrv.editFixture(fixture);
    this.fixtureForm.reset();
    this.adminSrv.getLastFixture();
  }
}
