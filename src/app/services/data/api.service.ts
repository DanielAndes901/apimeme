import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  HttpClient
} from '@angular/common/http';

import { data } from './products';

type MapPageToItems = Record<number, IProduct[]>

export interface IProduct {
  
  id: number;
  name: string;
  img: string; 
}

export interface IProductResponse {
  data: IProduct[];
  status: boolean;
  totalItem: number;
  totalPage: number;
  pageSize: string;
  currentPage: string;
}



@Injectable({ providedIn: 'root' })
export class ApiService {

  private m_mapPageToItems : MapPageToItems = {};
  private m_mapPageToItemsForTwo : MapPageToItems = {};

  constructor(private http: HttpClient) { 

    for(let i = 0; i < 10; i ++) {

      let products: IProduct[] = this.generateProducts(9);
      this.m_mapPageToItems[i] = products;
    }

    for(let i = 0; i < 10; i ++) {

      let products: IProduct[] = this.generateProducts(18);
      this.m_mapPageToItemsForTwo[i] = products;
    }

  }


  getProductsForPageTwo(pageSize: number, currentPage) {
    
    if(this.m_mapPageToItemsForTwo[currentPage] == null) {
      let products : IProduct[] = this.generateProducts(pageSize);
      this.m_mapPageToItemsForTwo[currentPage] = products;
    }
    
    let products = this.m_mapPageToItemsForTwo[currentPage];

    let totalItem = 0;
    for(let id in this.m_mapPageToItemsForTwo) {
      totalItem += this.m_mapPageToItemsForTwo[id].length;
    }

    let keys = Object.keys(this.m_mapPageToItemsForTwo);
    keys.sort(function(a,b) { return parseInt(b) - parseInt(a) });
    let totalPage = parseInt(keys[0]);

    let result = {
      status : 200,
      totalItem : totalItem,
      totalPage : totalPage,
      data : products
    }

    return Observable.of(result);

    //const url = environment.urlForMain + '/cakes/paging';
    // let params = new HttpParams();
    // params = params.append('pageSize', pageSize + '');
    // params = params.append('currentPage', currentPage + '');
    // params = params.append('search', search);
    // params = params.append('orderBy', orderBy);

    // return this.http.get(url, { params })
    //   .pipe(

    //     map((res: any) => {
         
    //       return res;
    //     }),
    //     catchError(errorRes => {
    //       return throwError(errorRes);
    //     })
    //   );
  }

  getProducts(pageSize: number, currentPage) {
    
    if(this.m_mapPageToItems[currentPage] == null) {
      let products : IProduct[] = this.generateProducts(pageSize);
      this.m_mapPageToItems[currentPage] = products;
    }
    
    let products = this.m_mapPageToItems[currentPage];

    let totalItem = 0;
    for(let id in this.m_mapPageToItems) {
      totalItem += this.m_mapPageToItems[id].length;
    }

    let keys = Object.keys(this.m_mapPageToItems);
    keys.sort(function(a,b) { return parseInt(b) - parseInt(a) });
    let totalPage = parseInt(keys[0]);

    let result = {
      status : 200,
      totalItem : totalItem,
      totalPage : totalPage,
      data : products
    }

    return Observable.of(result);

    //const url = environment.urlForMain + '/cakes/paging';
    // let params = new HttpParams();
    // params = params.append('pageSize', pageSize + '');
    // params = params.append('currentPage', currentPage + '');
    // params = params.append('search', search);
    // params = params.append('orderBy', orderBy);

    // return this.http.get(url, { params })
    //   .pipe(

    //     map((res: any) => {
         
    //       return res;
    //     }),
    //     catchError(errorRes => {
    //       return throwError(errorRes);
    //     })
    //   );
  }

  generateProducts(pageSize: number): IProduct[] {

    let products : IProduct[] = [];

    for(let i = 0; i < pageSize; i ++) {

      let idx = Math.floor(Math.random() * data.length);
      products.push(data[idx]);
    }

    return products;
  }

}
