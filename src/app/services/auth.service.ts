import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }

  register(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/register`, formData);
  }

  logout(token: string) {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    return this.http.post<any>(`${this.apiUrl}/logout`, {},{ headers });
  } else {
    return throwError('Token de autenticación nulo');
  }
  }

  checkEmailAvailability(email: string): Observable<{ available: boolean }> {
    const url = `${this.apiUrl}/check-email`;
    return this.http.post<{ available: boolean }>(url, { email });
  }

  checkUserAvailability(user: string): Observable<{ available: boolean }> {
    const url = `${this.apiUrl}/check-user`;
    return this.http.post<{ available: boolean }>(url, { user });
  }

  getUserData(token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this.http.get<any>(`${this.apiUrl}/user-data`, { headers }).pipe(
        catchError((error: any) => {
          console.error('Error al obtener los datos del usuario', error);
          return throwError('Error al obtener los datos del usuario');
        })
      );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

}
