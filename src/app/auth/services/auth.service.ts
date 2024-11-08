import { Injectable, computed, signal } from '@angular/core';
import { Observable, of} from 'rxjs';
import { User } from '../interfaces/auth.interface';
import { AuthStatus} from '../interfaces/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser  = signal<User|null>(null);
  private _authStatus   = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(()=> this._currentUser());
  public authStatus  = computed(()=> this._authStatus());

  constructor() { }


  login(email: string, password: string): Observable<boolean> {

    if (email === 'prueba.pass@gmail.com' && password === 'pruebaSeleccion') {
      this._authStatus.set(AuthStatus.authenticated);
      return of(true)
    } else {
      this._authStatus.set(AuthStatus.noAuthenticated);
      return of(false);
    }
  }


}
