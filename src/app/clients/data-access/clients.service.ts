import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import { UsersRegister, UsersRegisterResponse } from '../utils/models/users-register.model';
import { take } from 'rxjs';
import { UsersKeyword } from '../utils/models/users-keywords.model';
import { UsersLoginResponse } from '../utils/models/users-login';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  http = inject(HttpClient);
  private clientCategories = signal<string | null>('')
  // selector for client categories
  clientCats = computed(() => this.clientCategories());


  // check username availability with api
  checkUsernameApi(username: string | null): Observable<boolean> {
    return this.http.get<boolean>(environment.api.address + '/users/username/' + username)
  }

  // check username availability with api
  checkEmailApi(email: string | null): Observable<boolean> {
    return this.http.get<boolean>(environment.api.address + '/users/email/' + email)

  }

  // login function to login user
  login(user: FormData): Observable<UsersLoginResponse> {
    return this.http.post<UsersLoginResponse>(environment.api.address + '/login', user)
  }

  // logout function to logout user
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    return
  }

  // register function to register user
  register(user: UsersRegister): Observable<UsersRegisterResponse> {
    return this.http.post<UsersRegisterResponse>(environment.api.address + '/users', user)
  }

  // get user keywords
  getClientCategories() {
    this.http.get<string>(environment.api.address + '/search').pipe(
      take(1)
    ).subscribe(
      (data: string) => {
        this.clientCategories.set(data)
      },
      (error) => {
        this.clientCategories.set(null)
      }
    )
  }
  // add user keyword
  addClientCategory(keyword: string) {
    const request: UsersKeyword = { keywords: keyword }
    this.http.post(environment.api.address + '/search', request).pipe(
      take(1)
    ).subscribe(
      (data) => {
        this.clientCategories.set(data.toString())
      }
    )
  }
  // delete user keyword
  deleteClientCategory(keyword: string) {
    const request: UsersKeyword = { keywords: keyword }
    this.http.patch<any>(environment.api.address + '/search/', request).pipe(
      take(1))
      .subscribe(
        (data: string) => {
          this.clientCategories.set(data)
        }
      )
  }
}
