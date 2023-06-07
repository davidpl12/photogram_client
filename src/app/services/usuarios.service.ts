import { Usuario } from './../models/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Roles } from '../models/Roles';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8000/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  private getHeaders(token: string): HttpHeaders {
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    } else {
      throw new Error('Token de autenticación nulo');
    }
  }

  getUsuarios(token: string): Observable<Usuario[]> {
    const headers = this.getHeaders(token);
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`, { headers });
  }

  getUsuario(id: number, token: string): Observable<Usuario> {
    const headers = this.getHeaders(token);
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`, { headers });
  }

  crearUsuario(usuario: Usuario, token: string): Observable<Usuario> {
    const headers = this.getHeaders(token);
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario, { headers });
  }

  actualizarUsuario(usuario: Usuario, token: string): Observable<Usuario> {
    const headers = this.getHeaders(token);
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${usuario.id}`, usuario, { headers });
  }

  eliminarUsuario(id: number, token: string): Observable<void> {
    const headers = this.getHeaders(token);
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`, { headers });
  }

  getRoles(token: string): Observable<Roles[]> {
    const headers = this.getHeaders(token);
    return this.http.get<Roles[]>(`${this.apiUrl}/roles`, { headers });
  }

  searchUsers(keyword: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/busquedad?search=${keyword}`);
  }

  verificarSeguidor(usuarioRecibeId: number, usuarioEnviaId: number, token: string): Observable<any> {
    const headers = this.getHeaders(token);

    const url = `${this.apiUrl}/usuarios/${usuarioRecibeId}/verificar-seguidor/${usuarioEnviaId}`;
    return this.http.get<any>(url, { headers });
  }

  seguir(usuarioRecibeId: number, usuarioEnviaId: number ) {
    return this.http.post<any>(`${this.apiUrl}/usuarios/seguir`, { usuarioRecibeId, usuarioEnviaId });
  }

  dejarSeguir(usuarioRecibeId: number, usuarioEnviaId: number) {
    return this.http.post<any>(`${this.apiUrl}/usuarios/dejar-seguir`, { usuarioRecibeId, usuarioEnviaId });
  }

}
