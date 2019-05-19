import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../services/posts.service';
import { Post } from '../models/post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts:Post[]=[];
  postSubscription:Subscription;
  constructor(private postService:PostService) { }

  ngOnInit() {
    //récupère les posts dans l'array
    this.postSubscription=this.postService.postSubject.subscribe(
      (post:Post[])=>{
        this.posts=post;
      }
    )
    this.postService.emitPost();
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }
}
