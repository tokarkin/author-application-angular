import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {serialize} from '../utils/serialize';
import {IPost} from '../models/author-detail.module';
import {IFilter} from '../models/filter.module';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private  http: HttpClient) { }
  getPost(id: number, filter: IFilter) {
    return this.http.get<IPost>(environment.basePath + `Posts/${id}` + serialize({filter}));
  }
}
