import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export abstract class IPlatform {

  public selectedBatch: any;
  public settiled = false;
  public paramItemForManage = null;

  public dateForProfit : string;
  public monthForProfit : string;
  public filterParams : any;

  protected urlForPlatform : string;
  protected platformType : string;

  constructor(protected authService: AuthService, protected http: HttpClient) {

  }


  public getDateForProfit(): string
  {
    return this.dateForProfit;
  }

  public getMonthForProfit(): string
  {
    return this.monthForProfit;
  }

  public setSelectedBatch(batch) {
    this.selectedBatch = batch;
  }

  public getSelectedBatch() {
    return this.selectedBatch;
  }

  public setManualTargetPrice(batch) {

    if (this.authService.currentAuth.user != null) {

      let token = this.authService.currentAuth.user.token;
      
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token',
          'authorization': token
        })
      };

      return this.http.post<any>(`${this.urlForPlatform}/setManualTargetPrice`, { batch }, httpOptions);
    }

    return throwError('You are not authorized.');
    
  }

  public setMonthForProfit(monthForProfit : string) {
    this.monthForProfit = monthForProfit;
  }

  public getFilerForTransaction() {
    return this.filterParams;
  }

  public setFilerForTransaction(params) {
    
    this.filterParams = params;
    
    if (this.authService.currentAuth.user != null) {

      let token = this.authService.currentAuth.user.token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token',
          'authorization': token
        })
      };

      this.http.post<any>(`${this.urlForPlatform}/setFilerForTransaction`, { params : params }, httpOptions).pipe().subscribe(result => {
          
      });      
    }

    return throwError('You are not authorized.');

  }

  public setDateForProfit(dateForProfit : string) {

    if (this.authService.currentAuth.user != null) {

      let token = this.authService.currentAuth.user.token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token',
          'authorization': token
        })
      };


      this.http.post<any>(`${this.urlForPlatform}/setTimeForProfit`, { date : dateForProfit }, httpOptions).pipe().subscribe(result => {
          this.dateForProfit = dateForProfit;        
      });
      
    }

    return throwError('You are not authorized.');
  }


  public setParamItemForManage(paramItem) {

    this.paramItemForManage = paramItem;
  }

  public getParamItemForManage() {

    return this.paramItemForManage;
  }


  public setPortfolio(portfolio) {

    if (this.authService.currentAuth.user != null) {

      let token = this.authService.currentAuth.user.token;
      
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'my-auth-token',
          'authorization': token
        })
      };

      return this.http.post<any>(`${this.urlForPlatform}/setPortfolio`, { portfolio }, httpOptions);
    }

    return throwError('You are not authorized.');
  }


  public numberWithCommas(x) {

    if (x != null) {
      let str = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str;
    }
    return "";
  }

}
