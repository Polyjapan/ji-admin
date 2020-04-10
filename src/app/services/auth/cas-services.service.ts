import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {handleError} from "../../data/auth/errors";
import {CasService, ServiceData} from "../../data/auth/casservices";

@Injectable({
  providedIn: 'root'
})
export class CasServicesService {
  private services = new BehaviorSubject<CasService[]>([]);
  private servicesMap: Observable<Map<number, CasService>>;
  private lastRefresh: number = 0;

  constructor(private http: HttpClient) {
    this.servicesMap = this.services.pipe(map(lst => {
      const map = new Map<number, CasService>();
      lst.forEach(e => map.set(e.serviceId, e));
      return map;
    }))
  }

  pullServices(): Observable<CasService[]> {
    return this.http.get<CasService[]>(environment.auth.apiUrl + '/api/v2/casservices').pipe(
      catchError(handleError),
      tap(data => this.services.next(data))
    )
  }

  pullService(id: number): Observable<CasService> {
    return this.http.get<CasService>(environment.auth.apiUrl + '/api/v2/casservices/' + id)
      .pipe(catchError(handleError))
  }

  refresh() {
    return this.pullServices().subscribe(_ => _);
  }

  getServices(): Observable<CasService[]> {
    return this.refreshIfNeeded();
  }

  getServicesMap(): Observable<Map<number, CasService>> {
    this.refreshIfNeeded();
    return this.servicesMap;
  }

  getService(id: number): Observable<CasService> {
    return this.getServicesMap().pipe(map(map => map.get(id)));
  }

  createService(service: CasService): Observable<CasService> {
    return this.http.post<CasService>(environment.auth.apiUrl + '/api/v2/casservices', service)
      .pipe(catchError(handleError));
  }

  getServiceData(service: number): Observable<ServiceData> {
    return this.http.get<ServiceData>(environment.auth.apiUrl + '/api/v2/casservices/' + service)
      .pipe(catchError(handleError));
  }

  deleteService(service: number): Observable<void> {
    return this.http.delete<void>(environment.auth.apiUrl + '/api/v2/casservices/' + service)
      .pipe(catchError(handleError));
  }

  updateService(id: number, service: CasService): Observable<void> {
    return this.http.put<void>(environment.auth.apiUrl + '/api/v2/casservices/' + id, service)
      .pipe(catchError(handleError));
  }

  addDomain(id: number, domain: string): Observable<string> {
    return this.http.post(environment.auth.apiUrl + '/api/v2/casservices/' + id + '/domains', domain, {responseType: 'text'})
      .pipe(catchError(handleError));
  }

  deleteDomain(id: number, domain: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/casservices/' + id + '/domains/delete', domain)
      .pipe(catchError(handleError));
  }

  addRequiredGroup(id: number, domain: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/casservices/' + id + '/requiredGroups', domain)
      .pipe(catchError(handleError));
  }

  deleteRequiredGroup(id: number, domain: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/casservices/' + id + '/requiredGroups/delete', domain)
      .pipe(catchError(handleError));
  }

  addAllowedGroups(id: number, domain: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/casservices/' + id + '/allowedGroups', domain)
      .pipe(catchError(handleError));
  }

  deleteAllowedGroups(id: number, domain: string): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/casservices/' + id + '/allowedGroups/delete', domain)
      .pipe(catchError(handleError));
  }

  addAllowedProxy(id: number, proxy: number): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/casservices/' + id + '/allowedProxy', proxy)
      .pipe(catchError(handleError));
  }

  deleteAllowedProxy(id: number, proxy: number): Observable<void> {
    return this.http.post<void>(environment.auth.apiUrl + '/api/v2/casservices/' + id + '/allowedProxy/delete', proxy)
      .pipe(catchError(handleError));
  }

  private refreshIfNeeded(): Observable<CasService[]> {
    const now = Date.now();
    if (now - this.lastRefresh > (60 * 15 * 1000)) {
      this.lastRefresh = now;
      this.refresh();
    }
    return this.services;
  }
}
