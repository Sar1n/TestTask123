import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(username: string, password: string) {
    const body = {Username: username, Password: password};
    return this.http.post('https://testloginwebapi.azurewebsites.net/api/login', body, {responseType: 'text'});
  }
}
