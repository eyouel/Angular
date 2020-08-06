import { throwError } from 'rxjs';
import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';  



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit  {
  posts: any[];
 
  constructor(private service: PostService) {  

  }
  ngOnInit(){
    this.service.getAll()
      .subscribe( 
        posts =>{ 
          this.posts = JSON.parse(posts); 
          console.log(this.posts); 
        }
        
        );
      
 
  }
  
  createPost(input: HTMLInputElement){
    //Optimistic Update
    let post = {title: input.value}; 
    this.posts.splice(0, 0, post); 
    
    input.value = '';    
    this.service.create(post) 
      .subscribe(
        newPost => {
          post['id'] = JSON.parse(newPost).id;

      }, (error: AppError) => {
            this.posts.splice(0,1);
            if (error instanceof BadInput){
              //this.form.setErrors(error.originalError);
            }
            else throw error;
            
                              
      });
  }

  updatePost(post){  
      this.service.update(post).
        subscribe(
          updatedPost=>{
            console.log(updatedPost);
            });
      //this.http.put(this.url, JSON.stringify(post)) ; 
  }
  deletePost(post){
    // this.service.deletePost(post.id).
    let index = this.posts.indexOf(post); 
    this.posts.splice(index, 1);      
    
    this.service.delete(post.id)
      .subscribe(
        null,
        (error: AppError) => {  
          this.posts.splice(index,0, post);  
          if (error instanceof NotFoundError) 
            alert('This post has already been deleted.');
          else throw error;
                         
      });  
  }

}
