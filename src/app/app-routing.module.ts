import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorsComponent} from './authors/authors.component';
import {AuthorDetailComponent} from './author-detail/author-detail.component';
import {PostComponent} from './post/post.component';


const routes: Routes = [
  {
    path: 'authors',
    component: AuthorsComponent,
  },
  {
    path: 'authors/:id',
    component: AuthorDetailComponent,
  },
  {
    path: 'authors/post/:id',
    component: PostComponent,
  },
  {
    path: '**',
    redirectTo: 'authors',
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
