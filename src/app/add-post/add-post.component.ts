import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  PostForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private postService:PostService,private router:Router) { }

  ngOnInit() {
    this.initForm();
  }

  //initialisation du formuaire
  initForm(){
    this.PostForm=this.formBuilder.group({
      title:["",Validators.required], 
      content:["",Validators.required]
    })
  }


  onSubmitForm(){
    const title = this.PostForm.get("title").value; //récupère les valeurs
    const content = this.PostForm.get("content").value;
    console.log(title+" "+content);
    this.postService.addPost(new Post(title,content,new Date(),0)); //ajoute un nouveau post à l'array
    this.router.navigate(['/posts']); //une fois crée renvoi aux posts
  }

}
