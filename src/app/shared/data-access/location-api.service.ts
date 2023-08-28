import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService {
  http = Inject(HttpClient);
  headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('user-email', 'emadbastawisi@outlook.com')
    .set(
      'api-token',
      'JJaNjicEehp92nWyLtQok3EIFlxIXIFy-VdujYxiLvAXIJ66AivNWsXeE-tNiUfFXCo'
    );
  url = 'https://www.universal-tutorial.com/api/getaccesstoken';
  getApiToken(): Observable<any> {
    return this.http.get(this.url, { headers: this.headers });
  }
}
