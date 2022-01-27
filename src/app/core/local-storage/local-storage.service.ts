import { Injectable } from '@angular/core';
import {AppComponent} from '../../app.component';

const APP_PREFIX = 'ANMS-';


class LocalStorage implements Storage {
  [name: string]: any;
  readonly length: number;
  clear(): void {}
  getItem(key: string): string | null {return undefined;}
  key(index: number): string | null {return undefined;}
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

export const AUTH_KEY = 'AUTH';
export const CUR_PAGE_KEY = "CUR_PAGE";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  constructor() { }

  static loadInitialState() {
    
    return Object.keys(localStorage).reduce((state: any, storageKey) => {

      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0
                  ? token
                  : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }
 

  setItem(key: string, value: any) {

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    
    if (typeof localStorage !== 'undefined') {
      
      let data = JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
      return data;
    }
  }

  

  removeItem(key: string) {

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(`${APP_PREFIX}${key}`);
    }
  }

  /** Tests that localStorage exists, can be written to, and read from. */
  testLocalStorage() {
    const testValue = 'testValue';
    const testKey = 'testKey';
    let retrievedValue: string;
    const errorMessage = 'localStorage did not return expected value';

    this.setItem(testKey, testValue);
    retrievedValue = this.getItem(testKey);
    this.removeItem(testKey);

    if (typeof retrievedValue !== 'undefined') {
      if (retrievedValue !== testValue) {
        throw new Error(errorMessage);
      }
    }

  }
}
