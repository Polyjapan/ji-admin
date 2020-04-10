import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Group, GroupData} from "../../data/auth/groups";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";
import {handleError} from "../../data/auth/errors";
import {UserProfile} from "../../data/auth/users";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private groups = new BehaviorSubject<GroupData[]>([]);
  private groupsMap: Observable<Map<string, GroupData>>;
  private lastRefresh: number = 0;

  constructor(private http: HttpClient) {
    this.groupsMap = this.groups.pipe(map(lst => {
      const map = new Map<string, GroupData>();
      lst.forEach(e => map.set(e.group.name, e));
      return map;
    }))
  }

  pullGroups(): Observable<GroupData[]> {
    return this.http.get<GroupData[]>(environment.auth.apiUrl + '/api/v2/groups').pipe(
      catchError(handleError),
      tap(data => this.groups.next(data))
    )
  }

  refreshGroups() {
    return this.pullGroups().subscribe(_ => _);
  }

  getGroups(): Observable<GroupData[]> {
    return this.refresh();
  }

  getGroupsMap(): Observable<Map<string, GroupData>> {
    this.refresh();
    return this.groupsMap;
  }

  getGroup(name: string): Observable<GroupData> {
    return this.getGroupsMap().pipe(map(map => map.get(name)));
  }

  pullGroup(name: String): Observable<GroupData> {
    return this.http.get<GroupData>(environment.auth.apiUrl + '/api/v2/groups/' + name).pipe(
      catchError(handleError),
    )
  }

  createGroup(group: Group): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/groups', group).pipe(catchError(handleError))
  }

  updateGroup(name: string, group: Group): Observable<void> {
    return this.http.put<void>(environment.auth.apiUrl + '/api/v2/groups/' + name, group).pipe(catchError(handleError))
  }

  deleteGroup(name: string): Observable<void> {
    return this.http.delete<void>(environment.auth.apiUrl + '/api/v2/groups/' + name).pipe(catchError(handleError))
  }

  addScope(group: string, scope: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/groups/' + group + '/scopes', scope).pipe(catchError(handleError))
  }

  removeScope(group: string, scope: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/groups/' + group + '/scopes/delete', scope).pipe(catchError(handleError))
  }

  addMember(group: string, member: number): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/groups/' + group + '/members', member).pipe(catchError(handleError))
  }

  getMembers(group: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(environment.auth.apiUrl + '/api/v2/groups/' + group + '/members').pipe(catchError(handleError))
  }

  removeMember(group: string, member: number): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/groups/' + group + '/members/delete', member).pipe(catchError(handleError))
  }

  private refresh(): Observable<GroupData[]> {
    const now = Date.now();
    if (now - this.lastRefresh > (60 * 15 * 1000)) {
      this.lastRefresh = now;
      this.refreshGroups();
    }
    return this.groups;
  }
}
