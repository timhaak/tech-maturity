import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    return true;
    // if (this.authProvider.isLoggedIn) {
    //   return true;
    // }
    //
    // this.store.dispatch({
    //   type: ROUTER_SET_NEXT_PAGE,
    //   payload: url,
    // });

    // // Navigate to the login page with extras
    // this.router.navigate(['sign-in']);
    // return false;
  }
}
