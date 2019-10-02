import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  baseUrl = 'http://192.168.1.106:3000/';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {

this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
this.currentUser = this.currentUserSubject.asObservable();
}
public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

login(username: string, password: string): Observable<User> {
  return this.http.post<any>(`${this.baseUrl}authentication/login`, { username, password })
    .pipe(
      delay(2000),
      map(user => {
        localStorage.setItem('token', user.data[0].accessToken.token);
        this.currentUserSubject.next(user);
        return user as User;
      }));
}


getToken(): string {
  return localStorage.getItem('token');
}
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}
}
