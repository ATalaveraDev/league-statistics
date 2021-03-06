import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin.routing.module';
import { AdminComponent } from './admin.component';
import { RegisterFixtureComponent } from './fixture/register-fixture.component';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    RegisterFixtureComponent
  ],
  providers: [AdminService]
})
export class AdminModule { }
