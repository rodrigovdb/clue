import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private storage = this.document.defaultView?.sessionStorage;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  set(key: string, value: any) {
    this.storage?.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return JSON.parse(this.storage?.getItem(key) || 'null');
  }

  clear(key: string) {
    this.storage?.removeItem(key);
  }
}
