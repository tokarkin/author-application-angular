
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IAuthor, ICountAuthor} from '../models/author.module';
import {Injectable} from '@angular/core';
import {serialize} from '../utils/serialize';
import {IAuthorDetail} from '../models/author-detail.module';
import {IFilter} from '../models/filter.module';



@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private  http: HttpClient) { }
  getAuthors(filter: IFilter) {
    return this.http.get<IAuthor[]>(environment.basePath + '/Authors' + serialize({filter}));
  }
  getAuthorsCount(filter: IFilter) {
    return this.http.get<ICountAuthor>(environment.basePath + '/Authors/count' + serialize({filter}));
  }
  getAuthorAndComments(id: number, filter?: IFilter) {
    return this.http.get<IAuthorDetail>(environment.basePath + `/Authors/${id}` + serialize({filter}));
  }

}
