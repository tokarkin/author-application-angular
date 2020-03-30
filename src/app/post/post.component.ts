import { Component, OnInit } from '@angular/core';
import {PostService} from '../_services/post.service';
import {ActivatedRoute} from '@angular/router';
import {IAuthorDetail, IPost} from '../models/author-detail.module';
import {delay, switchMap, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: IPost;
  isLoading = true;
  routeSubscription: Subscription;
  constructor(private postService: PostService,
              private route: ActivatedRoute) {
    this.getPostData();
  }
  getPostData() {
    this.routeSubscription = this.route.params.pipe(
      take(1),
      delay(500),
      switchMap(params => {
        const filter = {
          include:  [{
            relation: "author",
            }, {
              relation: "comments",
              scope: {
                include:{
                  relation: "author",
                }
              }
          }]
        };
        return this.postService.getPost(params?.id , filter) ;
      })
    ).subscribe((response: IPost) => {
      this.isLoading = false;
      this.post = response;
    });
  }
  ngOnInit(): void {
  }

}
