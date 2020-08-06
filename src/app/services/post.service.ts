
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {
 // private url = 'http://jsonplaceholder.typicode.com/posts';
  
  constructor(http: HttpClient) {
    super('http://jsonplaceholder.typicode.com/posts', http);
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

  
