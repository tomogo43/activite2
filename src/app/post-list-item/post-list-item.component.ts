import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../services/posts.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  @Input() title:string;
  @Input() created_at:Date;
  @Input() content:string;
  @Input() loveIts:number;
  @Input() position:number;
  constructor(private postService:PostService) { }

  ngOnInit() {
  }

  onLoveIts(position:number){
    this.postService.loveIts(position);
  }

  onDontLoveIts(position:number){
    this.postService.dontLoveIts(position);
  }

  onRemovePost(position:number){
    this.postService.removePost(position);
  }
}
