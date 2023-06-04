import { Usuario } from './../models/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8000/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getUsuarios(token: string): Observable<Usuario[]> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`, { headers });
  } else {
    // Manejar el caso cuando el token es null
    // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
    return throwError('Token de autenticación nulo');
  }
  }

  getUsuario(id: number, token:string): Observable<Usuario> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`, { headers });
  } else {
    // Manejar el caso cuando el token es null
    // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
    return throwError('Token de autenticación nulo');
  }
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${usuario.id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }
}
