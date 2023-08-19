import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import { UsersRegister } from '../utils/models/users-register.model';
import { BehaviorSubject, debounceTime, exhaustMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private username$ = new BehaviorSubject<boolean>(true);
  private email$ = new BehaviorSubject<boolean>(true);
  http = inject(HttpClient);
  headObj = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  constructor() { }

  //  username avilabelity
  checkUsername(): Observable<boolean> {
    return this.username$
  }
  // check username availability with api
  checkUsernameApi(username: string | null) {
    this.http.get<boolean>(environment.api.address + '/users/username/' + username)
      .subscribe(
        data => { this.username$.next(data) }
      )
  }

  //  username avilabelity
  checkEmail(): Observable<boolean> {
    return this.email$
  }
  // check username availability with api
  checkEmailApi(email: string | null) {
    this.http.get<boolean>(environment.api.address + '/users/email/' + email)
      .subscribe(
        data => { this.email$.next(data) }
      )
  }


  // login function to login user
  login(user: any): Observable<any> {
    return this.http.post(environment.api.address + '/login', user)
  }

  // logout function to logout user

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    return
  }

  // register function to register user
  register(user: UsersRegister): Observable<any> {
    return this.http.post(environment.api.address + '/users', user)
  }

  // get user keywords
  getClientKeywords(): Observable<string> {
    console.log(this.headObj)
    return this.http.get<string>(environment.api.address + '/search', { headers: this.headObj })
  }
  // add user keyword
  addClientKeyword(keyword: string): Observable<any> {
    return this.http.post(environment.api.address + '/search', keyword, { headers: this.headObj })
  }

  // delete user keyword
  deleteClientKeyword(keyword: string) : Observable<any> {
    console.log(this.headObj)
    return this.http.patch<any>(environment.api.address + '/search/' + keyword, null, { headers: this.headObj })
  }
}
