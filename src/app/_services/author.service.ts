
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IAuthor, ICountAuthor} from '../models/author.module';
import {Injectable} from '@angular/core';
import {serialize} from '../utils/serialize';
import {IAuthorDetail} from '../models/author-detail.module';



@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private  http: HttpClient) { }
  getAuthors(filter?) {
    return this.http.get<IAuthor[]>(environment.basePath + '/Authors' + serialize({filter}));
  }
  getAuthorsCount(filter) {
    return this.http.get<ICountAuthor>(environment.basePath + '/Authors/count' + serialize({filter}));
  }
  getAuthorAndComments(id, filter?) {
    return this.http.get<IAuthorDetail>(environment.basePath + `/Authors/${id}` + serialize({filter}));
  }

}
