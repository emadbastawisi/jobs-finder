import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import {
  UsersRegister,
  UsersRegisterResponse,
} from '../utils/models/users-register.model';
import { Subject, take } from 'rxjs';
import { UsersKeyword } from '../utils/models/users-keywords.model';
import { UsersLoginResponse } from '../utils/models/users-login';
import {
  UserCareerInterests,
  UserPersonalInfo,
  UserProfile,
} from '../utils/models/userProfile.models';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  http = inject(HttpClient);
  private _moveToNextStep = new Subject<void>();
  moveToNextStep$ = this._moveToNextStep.asObservable();

  moveToNextStep() {
    this._moveToNextStep.next();
  }

  // check username availability with api
  checkEmailApi(email: string | null): Observable<boolean> {
    return this.http.get<boolean>(
      environment.api.address + '/users/email/' + email
    );
  }

  // login function to login user
  login(user: FormData): Observable<UsersLoginResponse> {
    return this.http.post<UsersLoginResponse>(
      environment.api.address + '/login',
      user
    );
  }

  // logout function to logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return;
  }

  // register function to register user
  register(user: UsersRegister): Observable<UsersRegisterResponse> {
    return this.http.post<UsersRegisterResponse>(
      environment.api.address + '/users',
      user
    );
  }

  // get user profile
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      environment.api.address + '/users/profile'
    );
  }

  careerInterest(request: UserCareerInterests): Observable<UserProfile> {
    console.log(request);
    return this.http.post<UserProfile>(
      environment.api.address + '/users/addCareerInterests',
      request
    );
  }
    generalInfo(request: UserPersonalInfo): Observable<UserProfile> {
    console.log(request);
    return this.http.post<UserProfile>(
      environment.api.address + '/users/addPersonalInfo',
      request
    );
  }
}
