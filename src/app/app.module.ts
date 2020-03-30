import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppMaterialModule} from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorsComponent } from './authors/authors.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { ToYearsPipe } from './pipe/to-years.pipe';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AuthorDetailComponent,
    ToYearsPipe,
    PostComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [ToYearsPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
