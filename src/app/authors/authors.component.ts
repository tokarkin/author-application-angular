import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IAuthor, ICountAuthor, RequestFilter} from '../models/author.module';
import {AuthorService} from '../_services/author.service';
import {forkJoin, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements  AfterViewInit {
  filterAuthor: FormGroup;
  authors: IAuthor[] = [];
  displayedColumns: string[] = ['first_name', 'date_of_birth', 'gender', 'email', 'phone', 'country', 'posts_count'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength = 0;
  max: number;
  maxTo: number;
  min = 0;
  minTo: number;
  step = 1;
  minValue = 0;
  maxValue = 0;


  constructor(
    private authorHttp: AuthorService,
    private fb: FormBuilder,
  ) {
    this.getAuthors();
    this.fbGroup();
    this.sliderPriceValueChange();
  }
  fbGroup() {
    this.filterAuthor = this.fb.group({
      name: ['', ],
      is_female_gender: [''],
      allfieldSearch: [''],
      yearsFrom: [0],
      yearsTo: [0]
    });
  }

  getAuthors() {
    const filter = {};
    this.authorHttp.getAuthors(filter).subscribe( (response: IAuthor[]) => {
      response.map(el => el.post_count = parseInt(el.address.replace(/[^\d]/g, '')));
      console.log(response);
      this.authors = response;
    }, error => console.log(error));
  }
  sliderPriceValueChange() {
    this.filterAuthor.get('yearsFrom').valueChanges.subscribe(min => {
      const max =  this.filterAuthor.get('yearsTo').value;
      if (min !== 0) {
        if (min > max) {
          this.filterAuthor.get('yearsFrom').setValue(max, {emitEvent: false});
        }
      }
    });
    this.filterAuthor.get('yearsTo').valueChanges.subscribe( max => {
      const min = this.filterAuthor.get('yearsFrom').value;
      if (max < min) {
        this.filterAuthor.get('yearsTo').setValue(min + 1000 , {emitEvent: false});
      }
    });
  }
  getSkipValue() {
    return this.paginator.pageIndex * this.paginator.pageSize;
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });
    this.listenFormChange();
  }
  listenFormChange() {
    merge(this.sort.sortChange, this.paginator.page, this.filterAuthor.valueChanges)
      .pipe(
        startWith({}),
        switchMap(() => {
          const findName = this.filterAuthor.get('name').value;
          const filterByAllField = this.filterAuthor.get('allfieldSearch').value;
          const genderFilterValue = this.filterAuthor.get('is_female_gender').value;
          this.minValue = this.filterAuthor.get('yearsFrom').value;
          this.maxValue = this.filterAuthor.get('yearsTo').value;
          console.log(this.maxValue, this.minValue);
          const minYear = this.fromAgeToDate(this.minValue);
          const maxYear = this.fromAgeToDate(this.maxValue);
          console.log(minYear, maxYear);
          const filter: RequestFilter = {
            order: `${this.sort.active} ${this.sort.direction}`,
            limit: this.paginator.pageSize,
            skip: this.getSkipValue(),
            where: {
            }
          };
          if (genderFilterValue) {
            filter.where.gender = genderFilterValue;
          }
          console.log(filter);
          filter.where.and = [];
          findName.split(' ').filter(el => el !== '').forEach(el => {
            const data = [
              {
                first_name: {
                  like: `%${el}%`,
                },
              },
              {
                last_name: {
                  like: `%${el}%`,
                },
              }];
            filter.where.and.push({
              or: data,
            });
          });
          filterByAllField.split(' ').filter(el => el !== '').forEach(el => {
            const data =
              [{
                country: {
                  like: `%${el}%`,
                }
              },
                {
                  city: {
                    like: `%${el}%`,
                  },
                },
                {
                  phone: {
                    like: `%${el}%`,
                  },
                }
              ];
            filter.where.and.push({
              or: data,
            });
          });
          if ((this.minValue !== 0) ) {
            filter.where.and.push({
              date_of_birth: {
                lt: minYear,
              }
            });
          }
          if ((this.maxValue !== 0) ) {
            filter.where.and.push({
              date_of_birth: {
                gt: maxYear,
              }
            });
          }
          const authors = this.authorHttp.getAuthors(filter);
          const count = this.authorHttp.getAuthorsCount(filter.where);
          return forkJoin([authors, count]);
        }),
        map(([data, count]) => {
          this.resultsLength = count.count;
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe((data: IAuthor[]) => {

      data.map(el => {
        el.post_count = parseInt(el.address.replace(/[^\d]/g, ''))
      });
      this.authors = data;
    });
  }
  fromAgeToDate(age: number) {
    const now = new Date();
    now.setFullYear(now.getFullYear() - age);
    return now.toISOString();
  }
}
