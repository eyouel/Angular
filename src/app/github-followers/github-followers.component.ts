// import { map } from 'rxjs/operators';
import { GithubFollowersService } from './../github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
// import 'rxjs/add/observable/combineLatest'; 
import { Observable, combineLatest } from 'rxjs';

import {switchMap, map} from 'rxjs/operators';


@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
   
  followers: any[];
  constructor(private route: ActivatedRoute, private service: GithubFollowersService) { }  

  ngOnInit() {
    //Combing to multiple Observables 
    let combined = combineLatest([this.route.queryParamMap, this.route.paramMap]);
    //subscribing to multiple Observable
    combined.pipe(switchMap(combined=>{  
        let id = combined[0].get('id'); 
        let page = combined[1].get('page');
        return this.service.getAll();  
      }))
        .subscribe( 
          followers => {this.followers = JSON.parse(followers);  console.log(this.followers);}

    );
    


  } 

}
