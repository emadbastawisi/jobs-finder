import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import {
  UsersRegister,
  UsersRegisterResponse,
} from '../utils/models/users-register.model';
import { Subject } from 'rxjs';
import { UsersLoginResponse } from '../utils/models/users-login';
import {
  CV,
  Skills,
  UserCareerInterests,
  UserLanguage,
  UserPersonalInfo,
  UserProfile,
  UserWorkExperience,
} from '../utils/models/userProfile.models';
import { Store } from '@ngrx/store';
import { selectUserProfileSetup } from 'src/app/store/setup/setup.reducers';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  http = inject(HttpClient);
  store = inject(Store);
  userProfile$ = this.store.selectSignal(selectUserProfileSetup);
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

  getCV(): Observable<Blob> {
    return this.http.get(
      environment.api.address + '/users/cv', { responseType: 'blob' }
    );
  }

  addCV(request: FormData): Observable<UserProfile> {
    return this.http.post<UserProfile>(
      environment.api.address + '/users/addCV',
      request
    );
  }
  deleteCV(): Observable<UserProfile> {
    return this.http.delete<UserProfile>(
      environment.api.address + '/users/deleteCV'
    );
  }

  addWorkExperience(request: UserWorkExperience): Observable<UserProfile> {
    return this.http.post<UserProfile>(
      environment.api.address + '/users/addWorkExperience',
      request
    );
  }

  updateWorkExperience(request: UserWorkExperience): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      environment.api.address + '/users/updateWorkExperience',
      request
    );
  }
  deleteWorkExperience(id: number): Observable<UserProfile> {
    return this.http.delete<UserProfile>(
      environment.api.address + '/users/deleteWorkExperience/' + id
    );
  }

  addLanguage(request: UserLanguage): Observable<UserProfile> {
    return this.http.post<UserProfile>(
      environment.api.address + '/users/addLanguage',
      request
    );
  }
  updateLanguage(request: UserLanguage): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      environment.api.address + '/users/updateLanguage',
      request
    );
  }
  deleteLanguage(id: number): Observable<UserProfile> {
    return this.http.delete<UserProfile>(
      environment.api.address + '/users/deleteLanguage/' + id
    );
  }

  getSkills(request: string): Observable<Skills[]> {
    return this.http.get<Skills[]>(
      environment.api.address + '/skills/' + request
    );
  }
}
