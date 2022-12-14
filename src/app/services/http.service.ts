import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Observable, Subscription, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BaseUrl: string = environment.BaseUrl + environment.api;

  constructor(private http: HttpClient) { }

  /**
  * Obtiene el ultimo usuario
  *
  * @returns Observable
  */
  getLastUser(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': ' XMLHttpRequest' });
    const route = `${this.BaseUrl}/get-last-user`;
    return this.http.get(route, { headers }).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getLocation(location: string): Observable<any> {
    const KEY = "LvXG1ANyn1RSqMitp48ryjsjqLXS5O1k";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': ' XMLHttpRequest' });
    const route = `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${location}`;
    return this.http.get(route, { headers }).pipe(
      map((data: any) => {
        return data.results[0].locations[0];
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  insertGithubUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': ' XMLHttpRequest' });
    const route = `${this.BaseUrl}/insert-user`;
    return this.http.post(route, user, { headers }).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getGithubListUsers(token: string, since: number, per_page: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': ' XMLHttpRequest', 'Authorization': `Bearer ${token}` });
    const route = `https://api.github.com/users?&since=${since}&per_page=${per_page}`;
    return this.http.get(route, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getGithubContextualUserInformation(token: string, login: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': ' XMLHttpRequest', 'Authorization': `Bearer ${token}` });
    const route = `https://api.github.com/users/${login}`;
    return this.http.get(route, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getUsersGithubStored(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': ' XMLHttpRequest' });
    const route = `${this.BaseUrl}/get-users-github-stored`;
    return this.http.get(route, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getPagination(url: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': ' XMLHttpRequest' });
    const route = `${url}`;
    return this.http.get(route, { headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
