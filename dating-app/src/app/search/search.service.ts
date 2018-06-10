import { Injectable } from '@angular/core';
import {Http} from "@angular/http";


@Injectable()
export class SearchService {
  constructor(private http:Http) { }
  getSearchData(data:any[]){
    return this.http.get('https://randomuser.me/api/?results=10');
  }

}
