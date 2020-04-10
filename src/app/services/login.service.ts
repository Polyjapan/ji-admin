import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ApiTokens} from "@japanimpact/angular-auth-framework";

@Injectable()
export class LoginService {
  private loginUrl = environment.auth.apiUrl + '/api/token/user';

  constructor(private http: HttpClient) {
  }

  //   case class UserTokenRequest(ticket: String, scopes: Set[String], audiences: Set[String], duration: Long) extends TokenRequest

  login(ticket: string): Observable<ApiTokens> {
    return this.http.post<ApiTokens>(this.loginUrl, {ticket: ticket, scopes: ['*'], audiences: ['auth', 'uploads', 'events'], duration: 60 * 60 * 3});
  }
}
