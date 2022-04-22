import { Injectable } from '@angular/core';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageMockService {
  private readonly storage = {};

  constructor() {}

  public getItem<T>(key: string): T | null {
    const item = this.storage[key];
    if (isNil(item)) {
      return null;
    }
    return item;
  }

  public setItem(key: string, value: any): void {
    this.storage[key] = value;
  }

  public removeItem(key: string): void {
    delete this.storage[key];
  }
}
