import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IBatchItem {
  id: number;
  symbol: string;
  duration: string;
  change: number;
  changePct: number;
  shares: number;
  lotLength: number;

  buyPrice: number;
  latestPrice: number;
  targetPrice: number;
  estimatedProfit: number;
  daysGain: number;
  totalCost: number;
  totalGain: number;
  buyStrikePercent: number;


  img: string;
  category: string;
  status: string;
  statusColor: string;



}

export interface IProductResponse {
  data: IBatchItem[];
  status: boolean;
  totalItem: number;
  totalPage: number;
  pageSize: string;
  currentPage: string;
}

@Injectable({ providedIn: 'root' })
export class BatchService {


  constructor() { }


}
