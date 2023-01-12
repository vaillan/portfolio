import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private logged = new BehaviorSubject<boolean>(sessionStorage.getItem('token')? true: false);
  isLogged$ = this.logged.asObservable();

  constructor() { }

  public changeStatusLogged(value: boolean) {
    this.logged.next(value);
  }

}
