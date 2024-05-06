import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  template: '',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lmvsoftwareApp';
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('login');
      }
    });
  }
}

