import { ErrorHandler } from '@angular/core'

export class AppErrorHandler implements ErrorHandler{
      handleError(error){
         alert('An unexpected error occurred.'); 
         console.log(error);//Instead of console.log we could log the error on the server
      }
}