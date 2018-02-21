import { Component } from '@angular/core';

import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html'
})
export class AdminComponent {
  constructor(public adminSrv: AdminService) {
    this.adminSrv.getLastFixture();
  }
}
