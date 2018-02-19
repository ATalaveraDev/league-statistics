import { NgModule } from '@angular/core';

import { PointsRoutingModule } from './points.routing.module';
import { PointsComponent } from './points.component';

@NgModule({
  imports: [PointsRoutingModule],
  declarations: [PointsComponent]
})
export class PointsModule { }
