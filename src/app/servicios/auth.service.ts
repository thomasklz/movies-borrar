import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserLogin } from '../interface/IUsers';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private http = inject(HttpClient);

  constructor() { }

  login(email: string, password: string) {
    return this.http.post<IUserLogin>('http://localhost:3000/api/login', { email, password });
  }
}


