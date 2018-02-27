import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-player-points',
  styleUrls: ['./player-points.component.less'],
  templateUrl: './player-points.component.html'
})
export class PlayerPointsComponent {
  @Input() name: string;
  @Input() players: Observable<any>;

  constructor() { }
}
