import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {catchError, map} from 'rxjs/operators';
import {ApiTokenStorageService} from "@japanimpact/angular-auth-framework";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root',
})
export class PermissionAuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: ApiTokenStorageService,
              private loginService: LoginService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean> | UrlTree | boolean {
    const expectedScope: string = route.data.scope;

    const ticket = route.queryParamMap.get('ticket');

    if (!expectedScope) {
      // If we don't require a perm, it means we only want the user to be logged in
      if (!this.authService.isAuthenticated()) {
        return this.tryLogin(ticket);
      }
      return true;
    } else {
      const ok = this.authService.hasScope(expectedScope);

      if (!ok) {
        if (this.authService.isAuthenticated()) {
          return this.router.createUrlTree(['/']);
        } else {
          return this.tryLogin(ticket);
        }
      }

      return ok;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  private tryLogin(ticket?: string): Observable<UrlTree> | UrlTree {
    if (ticket) {
      return this.loginService
        .login(ticket)
        .pipe(map(success => {
          this.authService.login(success.token);

          /*if (!this.authService.hasScope("admin/access")) {
            this.authService.logout();
            const details = 'permissions';
            return this.router.createUrlTree(['login-failed', details]);
          }*/

          return this.router.createUrlTree(['/']);
        }))
        .pipe(catchError(err => {
          const details = err.status === 403 ? 'permissions' : 'request';
          return of(this.router.createUrlTree(['login-failed', details]))
        }));
    } else {
      return this.router.createUrlTree(['require-login']);
    }
  }
}
