import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import { currentUser } from '../clients/utils/models/users-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  getCurrentUser(): Observable<currentUser> {
    return this.http.get<currentUser>(environment.api.address + '/users/current')
  }
}
