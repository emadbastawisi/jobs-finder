import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Keywords } from '../utils/models/kewords.model';
import { UsersRegister } from '../utils/models/users-register.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  http = inject(HttpClient);
  headObj = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  constructor() { }

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
  getKeywords(): Observable<Keywords> {
    return this.http.get<Keywords>(environment.api.address + '/search', { headers: this.headObj })
  }

}
