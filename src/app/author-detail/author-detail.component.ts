import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route} from '@angular/router';
import {Subscription} from 'rxjs';
import {delay, switchMap, take} from 'rxjs/operators';
import {AuthorService} from '../_services/author.service';
import {IAuthorDetail} from '../models/author-detail.module';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  routeSubscription: Subscription;
  authorId: number;
  authorsData: IAuthorDetail;
  isLoading = true;
  constructor(private route: ActivatedRoute,
              private authorService: AuthorService) {
    this.getAuthorData();
  }
  getAuthorData() {
    this.routeSubscription = this.route.params.pipe(
      take(1),
      delay(500),
      switchMap(params => {
        this.authorId = params.id;
        const filter = {
          include: [
            {
              relation: "posts",
            },
          ],
        };
        return this.authorService.getAuthorAndComments(params?.id , filter) ;
      })
    ).subscribe((response: IAuthorDetail) => {
        this.isLoading = false;
        this.authorsData = response;
        console.log(this.authorsData);
    });
  }

  ngOnInit(): void {
  }

}
