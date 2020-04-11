import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {handleError} from "../../data/auth/errors";
import {Event, SimpleEvent} from "../../data/events/event";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(environment.events.apiUrl + '/events').pipe(catchError(handleError))
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(environment.events.apiUrl + '/events/' + id).pipe(catchError(handleError))
  }

  createEvent(event: SimpleEvent): Observable<SimpleEvent> {
    return this.http.post<SimpleEvent>(environment.events.apiUrl + '/events', event).pipe(catchError(handleError))
  }

  updateEvent(id: number, event: SimpleEvent) {
    return this.http.put<SimpleEvent>(environment.events.apiUrl + '/events/' + id, event).pipe(catchError(handleError))
  }
}
