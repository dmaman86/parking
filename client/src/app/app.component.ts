import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AdminService ]
})
export class AppComponent {
  // title = 'client';
  public title: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Parking Payment App';
  }
}
