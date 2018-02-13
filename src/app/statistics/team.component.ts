import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-team',
  templateUrl: 'team.component.html'
})
export class TeamComponent {
  @Input() owner: string;
  @Input() team: Observable<any>;

  constructor() {}
}
