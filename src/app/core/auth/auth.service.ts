import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../interfaces/login.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseAuthInterface } from '../interfaces/response-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLogin$ = new BehaviorSubject<string | null>(null);
  private isLogged$ = new BehaviorSubject<boolean>(false);

  url: string = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {}

  login(data: LoginInterface): Observable<ResponseAuthInterface> {
    return this.http
      .post<ResponseAuthInterface>(`${this.url}authentication`, data)
      .pipe(
        tap((response) => {
          this.userLogin$.next(response.claims.login);
          this.isLogged$.next(true);
        }),
      );
  }

  get UserInfo(): string | null {
    return this.userLogin$.getValue();
  }

  get IsLogged(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.userLogin$.next(null);
    this.isLogged$.next(false);
  }
}
