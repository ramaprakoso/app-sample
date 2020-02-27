import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MProject {
  id : string;
  name : string; 
  arrival : string; 
  code : string; 
  created_at : string;
  created_by : string;
  updated_at : string;
  updated_by : string;
  deleted_at : string;
  deleted_by : string;
}

@Injectable()
export class ApiService {
  apiURL = 'http://localhost:12303';
  
  constructor(private http: HttpClient){}

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  }); 

  getProject(): Observable<MProject[]>{
    return this.http.get<MProject[]>(this.apiURL + '/sample/mproject')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
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
