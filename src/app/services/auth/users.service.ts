import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData, UserProfile} from "../../data/auth/users";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {handleError} from "../../data/auth/errors";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(environment.auth.apiUrl + '/api/v2/users').pipe(catchError(handleError))
  }

  getUser(id: number): Observable<UserData> {
    return this.http.get<UserData>(environment.auth.apiUrl + '/api/v2/users/' + id).pipe(catchError(handleError))
  }

  forgeLogout(id: number): Observable<UserData> {
    return this.http.get<UserData>(environment.auth.apiUrl + '/api/v2/users/' + id + '/logout').pipe(catchError(handleError))
  }

  forceEmailConfirm(id: number): Observable<UserData> {
    return this.http.get<UserData>(environment.auth.apiUrl + '/api/v2/users/' + id + '/confirmEmail').pipe(catchError(handleError))
  }

  updateUser(id: number, newContent: UserProfile): Observable<void> {
    return this.http.put<void>(environment.auth.apiUrl + '/api/v2/users/' + id, newContent).pipe(catchError(handleError))
  }

  addScope(id: number, scope: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/users/' + id + '/scopes', scope).pipe(catchError(handleError))
  }

  deleteScope(id: number, scope: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/users/' + id + '/scopes/delete', scope).pipe(catchError(handleError))
  }

}
