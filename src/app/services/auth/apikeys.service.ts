import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserProfile} from "../../data/auth/users";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {handleError} from "../../data/auth/errors";
import {ApiKey, ApiKeyData} from "../../data/auth/apikeys";

@Injectable({
  providedIn: 'root'
})
export class ApikeysService {

  constructor(private http: HttpClient) { }

  getApiKeys(): Observable<ApiKeyData[]> {
    return this.http.get<ApiKeyData[]>(environment.auth.apiUrl + '/api/v2/apikeys').pipe(catchError(handleError))
  }

  createApiKey(name: string): Observable<ApiKey> {
    return this.http.post<ApiKey>(environment.auth.apiUrl + '/api/v2/apikeys', name).pipe(catchError(handleError))
  }

  getApiKey(id: number): Observable<ApiKeyData> {
    return this.http.get<ApiKeyData>(environment.auth.apiUrl + '/api/v2/apikeys/' + id).pipe(catchError(handleError))
  }

  updateApiKey(id: number, name: string): Observable<ApiKey> {
    return this.http.put<ApiKey>(environment.auth.apiUrl + '/api/v2/apikeys/' + id, name).pipe(catchError(handleError))
  }

  deleteApiKey(id: number): Observable<void> {
    return this.http.delete<void>(environment.auth.apiUrl + '/api/v2/apikeys/' + id).pipe(catchError(handleError))
  }

  getScopes(id: number): Observable<string[]> {
    return this.http.get<string[]>(environment.auth.apiUrl + '/api/v2/apikeys/' + id + '/scopes').pipe(catchError(handleError))
  }

  addScope(id: number, scope: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/apikeys/' + id + '/scopes', scope).pipe(catchError(handleError))
  }

  removeScope(id: number, scope: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/apikeys/' + id + '/scopes/delete', scope).pipe(catchError(handleError))
  }
}
