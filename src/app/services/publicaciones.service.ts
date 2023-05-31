import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Publicacion } from '../models/Publicacion';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private apiUrl = 'http://localhost:8000/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las publicaciones
  getPublicaciones(token: string): Observable<Publicacion[]> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<any[]>(`${this.apiUrl}/publicaciones`, { headers });
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  // Obtener una publicación por ID
  getPublicacion(id: number, token: string): Observable<Publicacion> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<Publicacion>(`${this.apiUrl}/publicaciones/${id}`);
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  // Obtener una publicación por autor
  getAutorPublicacion(autor: number, token: string): Observable<Publicacion[]> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<Publicacion[]>(
        `${this.apiUrl}/publicaciones/autor/${autor}`, { headers });
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  // Crear una nueva publicación
  crearPublicacion(formData: FormData, token: string): Observable<Publicacion> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.post<Publicacion>(
        `${this.apiUrl}/publicaciones`,
        formData,
        { headers }
      );
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  // Actualizar una publicación existente
  actualizarPublicacion(publicacion: Publicacion): Observable<Publicacion> {
    return this.http.put<Publicacion>(
      `${this.apiUrl}/publicaciones/${publicacion.id}`,
      publicacion
    );
  }

  // Eliminar una publicación
  eliminarPublicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/publicaciones/${id}`);
  }

  getNumSeguidores(idRecibe : number,token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this.http.get<any>(`${this.apiUrl}/num-seguidores/${idRecibe}`, { headers }).pipe(
        catchError((error: any) => {
          console.error('Error al obtener los datos de los seguidores', error);
          return throwError('Error al obtener los datos del usuario');
        })
      );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }
  getNumSeguidos(idEnvia : number,token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this.http.get<any>(`${this.apiUrl}/num-seguidos/${idEnvia}`, { headers }).pipe(
        catchError((error: any) => {
          console.error('Error al obtener los datos de los seguidos', error);
          return throwError('Error al obtener los datos del usuario');
        })
      );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

  getSeguidos(idEnvia : number,token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this.http.get<any>(`${this.apiUrl}/todosseguidos/${idEnvia}`, { headers }).pipe(
        catchError((error: any) => {
          console.error('Error al obtener los datos de los seguidos', error);
          return throwError('Error al obtener los datos del usuario');
        })
      );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }
}
