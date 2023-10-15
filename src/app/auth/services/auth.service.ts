import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap, catchError } from 'rxjs';

import { environments } from 'src/environments/environments';

import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})

export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {

    if ( !this.user) return undefined;

    // ? Crea un clon profundo de un objeto, siempre va a ser un deep clone sin importar las propiedades o los objetos que tenga.
    return structuredClone (this.user);
  }

  login(email: string, password: string): Observable<User> {

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'fh24tqg84yhgy9301.gherqgh9.g4qgj0q.' )),
      )

  }

  checkAuthentication(): Observable<boolean> {

    if (!localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    // ? El of me permite retornar el booleano en el observable.
    return this.http.get<User>( `${ this.baseUrl }/users/1` )
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false) )
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
