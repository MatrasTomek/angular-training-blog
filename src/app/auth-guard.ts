import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.IsLogged.pipe(
      map((isLogged) => {
        if (!isLogged) {
          this._snackBar.open('Najpierw się zaloguj!', 'Zamknij');
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }),
    );
  }
}
