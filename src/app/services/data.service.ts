import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';



export class DataService {
  
  constructor(private url: string, private http: HttpClient) { }
  getAll(){
    return this.http.get(this.url).pipe(map(response => JSON.stringify(response))
        ,
      catchError(this.handleError)  
    
    ); 
  }
  create(resource){
    //return throwError(new AppError());
     return this.http.post<any>(this.url, JSON.stringify(resource)).pipe(
         map(response => JSON.stringify(response)),catchError(this.handleError)
    
     );
  }
  update(resource){
    return this.http.patch(this.url + '/' + resource.id , JSON.stringify({isRead: true})).  pipe(
        map(response => JSON.stringify(response)),catchError( this.handleError)); 
  }
  delete(id){
    //return throwError(new AppError());
    return this.http.delete(this.url + '/' + id).pipe(map(response => JSON.stringify(response)),catchError( this.handleError)); 
    
  }
  private handleError(error: HttpErrorResponse){
    if (error.status == 400)
      return throwError(new BadInput(JSON.stringify(error)));

    if (error.status === 404)
      return throwError(new NotFoundError());
      
    return throwError(new AppError(error));
  }

  // deletePost(id){
  //   return this.http.delete(this.url + '/' + id).pipe(
  //     catchError(this.handleError)
  //     ); 
  //   }
  // private handleError(error: HttpErrorResponse){
  //   return throwError(error);
  //     }
  }

  
