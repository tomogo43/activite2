//Service de gestion des posts de l'application ==> Ajout,Suppression, LoveIts Don't love its

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PostService{
    private posts:Post[]=[];
    postSubject = new Subject<Post[]>();

    constructor(private httpClient:HttpClient,private router:Router){
        this.getPost(); //récupère les posts depuis firebase au lancement de l'application
    }

    emitPost(){
        this.postSubject.next(this.posts.slice()); //emmet les posts au reste de l'applicatin
    }

    getPost(){ //méthode pour récupérer les posts
        this.httpClient.get<Post[]>("https://activite2.firebaseio.com/posts.json").subscribe(
            (post:Post[])=>{
                if(post){
                    this.posts=post;
                    this.emitPost();
                }
                
            }
        )
    }

    savePost(){ //méthode de sauvegarde des posts
        this.httpClient.put("https://activite2.firebaseio.com/posts.json",this.posts).subscribe(data=>{

        })
    }

    loveIts(position:number){ //méthode d'ajout de love it
        this.posts[position].loveIts++;
        this.savePost(); //sauvegarde de l'array avec le nouveau nombre de love its
    }

    dontLoveIts(position:number){ //méthode d'ajout de don't love it
        this.posts[position].loveIts--;
        this.savePost(); //sauvegarde de l'array avec le nouveau nombre de love it
    }

    removePost(position:number){ //méthode de suppression de post prend en paramètre la position du post dans l'array
        if(confirm("Voulez vous vraiment supprimer le post \""+this.posts[position].title+"\"")){
            //si true...
            this.posts.splice(position,1);  //supprime un élement à la position position
            this.savePost(); //sauvegarde l'array post
            this.emitPost(); //émet l'array dans le reste de l'appli
        }
    }

    addPost(post:Post){ //méthode d' ajout de post prend en paramètre un modèle Post
        this.posts.push(post); //ajout du modèle à l'array des posts
        this.savePost(); 
        this.emitPost();
    }
}