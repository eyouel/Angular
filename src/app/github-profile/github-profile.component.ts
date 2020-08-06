import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    }
  
  submit(){
    this.router.navigate(['/followers'],{queryParams: {page: 1, order: 'newest'}});
  }

}
