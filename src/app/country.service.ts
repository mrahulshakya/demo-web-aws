import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
  providedIn : 'root'
})

export class CountryService {
 apiUrl = 'https://rku5krhh6d.execute-api.us-west-2.amazonaws.com/Prod/api';
  constructor(private httpClient: HttpClient){
  }

  public loadCountries(): Observable<Array<Country>> {
    return this.httpClient.get<Array<Country>>(this.apiUrl + '/countries' ).pipe(
    retry(1),
    catchError(this.handleError));
  }

   // Error handling
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
