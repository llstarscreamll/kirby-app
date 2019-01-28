import { Injectable, Inject } from '@angular/core';

export const APP_PREFIX = 'APP-';

@Injectable()
export class LocalStorageService {
  constructor() { }

  /**
   * @todo write tests to this method
   */
  public static loadInitialState() {
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        state = state || {};
        const stateKey = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.');
        let currentStateRef = state;
        stateKey.forEach((key, index) => {
          if (index === stateKey.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, undefined);
  }

  public setItem(key: string, value: any) {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  public getItem(key: string) {
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }

  public removeItem(key: string) {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
