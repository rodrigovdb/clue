import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export interface SessionItem {
  key: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private storage = this.document.defaultView?.sessionStorage;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  set(key: string, value: SessionItem[]) {
    this.storage?.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return JSON.parse(this.storage?.getItem(key) || 'null');
  }

  clear(key: string) {
    this.storage?.removeItem(key);
  }
}
