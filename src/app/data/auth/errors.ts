import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

export class APIError {
  error: string;
  errorMessage: string;
}

export function handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
    return throwError('Erreur interne du client. Merci de réessayer plus tard.');
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);

    try {
      const body = ((typeof error.error === 'string') ? JSON.parse(error.error) : error.error) as APIError;
      console.log(body.errorMessage);
      return throwError('Erreur du serveur : ' + body.errorMessage);
    } catch (e) {
      console.error('An error occurred while processing the error', e);
      return throwError('Erreur inconnue du serveur')
    }
  }
}
