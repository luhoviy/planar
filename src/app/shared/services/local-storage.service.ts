import { Injectable } from '@angular/core';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (isNil(item)) {
      return null;
    }
    return JSON.parse(item);
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
