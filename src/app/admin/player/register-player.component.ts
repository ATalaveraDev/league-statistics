import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-player',
  templateUrl: 'register-player.component.html'
})
export class RegisterPlayerComponent {
  playerForm: FormGroup;

  constructor(private service: AdminService) {
    this.playerForm = new FormGroup({
      position: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required)
    });
  }

  submitForm(): void {
    this.service.addTeamPlayer(this.playerForm.value);
  }
}
