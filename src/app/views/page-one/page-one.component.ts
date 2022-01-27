import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/core/core.module';
import { ApiService, IProduct } from 'src/app/services/data/api.service';

import { LocalStorageService } from 'src/app/core/core.module';
import { CUR_PAGE_KEY } from 'src/app/core/local-storage/local-storage.service';


@Component({
  selector: 'page-one',
  templateUrl: './page-one.component.html'
})
export class PageOneComponent implements OnInit, OnDestroy {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  selected: IProduct[] = [];
  data: IProduct[] = [];

  search = '';
  orderBy = '';
  selectAllState = '';

  public itemsPerPage: number  = 9;
  public totalItem: number = 50;
  public totalPage: number = 10;

  public isLoading : boolean = false;
  public endOfTheList = false;

  
  private _currentPage : number = 1;
  set currentPage(pageIdx: number) {
    this.localStorageService.setItem(CUR_PAGE_KEY, pageIdx);
    this._currentPage = pageIdx;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) { 

  }
 
  
  ngOnInit(): void {

    let pageIdx: number = this.localStorageService.getItem(CUR_PAGE_KEY);
    this.loadData(pageIdx);
  }
  
  loadData(pageIdx: number = 1): void {

    this.currentPage = pageIdx;
  
    this.apiService.getProducts(this.itemsPerPage, pageIdx).subscribe(
      res => {
        if (res.status) {

          this.isLoading = false;
          this.data = res.data;
          this.totalItem = res.totalItem;
          this.totalPage = res.totalPage;
          
          this.setSelectAllState();
        }
        else {
          this.endOfTheList = true;
        }
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  
  ngOnDestroy(): void {
    
  }


  isSelected(p: IProduct): boolean {
    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: IProduct): void {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState(): void {
    if (this.selected.length === this.data.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  pageChanged(event: any): void {

    this.loadData(event.page);
  }

  onContextMenuClick(action: string, item: IProduct): void {
    console.log('onContextMenuClick -> action :  ', action, ', item.title :', item.name);
  }

}
