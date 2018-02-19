import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened: boolean;

  constructor(private router: Router) {
    this.opened = false;
    this.router.events
      .subscribe((routerEvent) => {
        if (routerEvent instanceof NavigationStart) {
          this.opened = false;
        }
      });
  }

  toggle(): void {
    this.opened = !this.opened;
  }
}
