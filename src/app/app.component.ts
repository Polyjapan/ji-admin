import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {ApiTokenStorageService} from "@japanimpact/angular-auth-framework";
import {RouterOutlet} from "@angular/router";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ji-admin';
  subUrl: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: ApiTokenStorageService) {
  }

  activateRoute(event, elem: RouterOutlet) {
    this.subUrl = elem.activatedRoute.snapshot.routeConfig.path;
  }

  logout() {
    this.auth.logout();
    window.location.replace(environment.auth.apiUrl + '/logout?app=' + window.location.origin);
  }

  get isLoggedIn() {
    return this.auth.isAuthenticated();
  }
}
