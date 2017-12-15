import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players.routing.module';

@NgModule({
  imports: [
    CommonModule,
    PlayersRoutingModule
  ],
  declarations: [PlayersComponent]
})
export class PlayersModule {
}
