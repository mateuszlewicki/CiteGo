import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Cite } from './model/Cite/cite';
import { environment } from './../environments/environment'
import { error } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private API_URI = environment.API_URL;
  constructor(private httpClient: HttpClient) { };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  public getAll() : Observable<Cite[]>{
    return this.httpClient.get<Cite[]>(this.API_URI+"/cites");
  }
  public addPost( cite: Cite ) : Observable<Cite> {


    
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Cite>(this.API_URI+"/cite",JSON.stringify(cite), {headers: headers})
    .pipe(
      catchError(this.handleError)
    );


  }
  public deletePost(cid: number){
    return this.httpClient.delete(this.API_URI+"/cite"+"/"+cid)
    .pipe(
      catchError(this.handleError)
    );
  }
    public updatePost(cite: Cite){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Cite>(this.API_URI+"/cite/"+cite.ID,JSON.stringify(cite), {headers: headers})
    .pipe(
      catchError(this.handleError)
    );

  }
}
