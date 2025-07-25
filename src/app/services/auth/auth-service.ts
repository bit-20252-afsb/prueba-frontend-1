import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIResponse, User } from '../../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl : string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient){}

  public login(email:string,password:string) : Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.baseApiUrl}/login`,{email,password});
  }

  public register(email:string, password:string): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.baseApiUrl}/create`,{email,password});
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseApiUrl}/`)
  }

  public setToken(token: string): void {
    sessionStorage.setItem('token',token)
  }

  public getToken(token: string) : void {
    sessionStorage.getItem('token')
  }

  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token')
  }
}
