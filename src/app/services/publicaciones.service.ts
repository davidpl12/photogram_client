import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Publicacion } from '../models/Publicacion';
import { Camara } from '../models/Camara';
import { Album } from '../models/Album';
import { Reacciones } from '../models/Reacciones';

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
      return this.http.get<Publicacion>(`${this.apiUrl}/publicaciones/${id}`, {
        headers,
      });
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
        `${this.apiUrl}/publicaciones/autor/${autor}`,
        { headers }
      );
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

      return throwError('Token de autenticación nulo');
    }
  }

  // Actualizar una publicación existente
  actualizarPublicacion(id: number, publicacion: FormData, token: string): Observable<Publicacion> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.post<Publicacion>(
        `${this.apiUrl}/publicaciones/${id}`,
        publicacion,
        { headers }
      ).pipe(
        catchError((error) => {
          console.error('Error al actualizar la publicación', error);
          return throwError('Error al actualizar la publicación');
        })
      );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

  // Eliminar una publicación
  eliminarPublicacion(id: number, token: string): Observable<void> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.http.delete<void>(`${this.apiUrl}/publicaciones/${id}`, { headers });
  } else {
    return throwError('Token de autenticación nulo');
  }
  }

  obtenerPublicacionesPorUsuario(idUsuario: number): Observable<any[]> {
    const url = `${this.apiUrl}/publicaciones/usuario/${idUsuario}`;
    return this.http.get<any[]>(url);
  }

  obtenerCamaraPorId(idCamara: number): Observable<any> {
    const url = `${this.apiUrl}/camaras/${idCamara}`;
    return this.http.get<any>(url).pipe(
      map(response => response.modelo)
    );
  }

  getNumSeguidores(idRecibe: number, token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http
        .get<any>(`${this.apiUrl}/num-seguidores/${idRecibe}`, { headers })
        .pipe(
          catchError((error: any) => {
            console.error(
              'Error al obtener los datos de los seguidores',
              error
            );
            return throwError('Error al obtener los datos del usuario');
          })
        );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

  getNumSeguidos(idEnvia: number, token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http
        .get<any>(`${this.apiUrl}/num-seguidos/${idEnvia}`, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error al obtener los datos de los seguidos', error);
            return throwError('Error al obtener los datos del usuario');
          })
        );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

  getSeguidos(idEnvia: number, token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http
        .get<any>(`${this.apiUrl}/todosseguidos/${idEnvia}`, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error al obtener los datos de los seguidos', error);
            return throwError('Error al obtener los datos del usuario');
          })
        );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

  getPublicacionesbyCamara(idCamara: number, token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http
        .get<any>(`${this.apiUrl}/publicaciones/camara/${idCamara}`, {
          headers,
        })
        .pipe(
          catchError((error: any) => {
            console.error('Error al obtener los datos de los seguidos', error);
            return throwError('Error al obtener los datos del usuario');
          })
        );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

  getPublicacionesbyAlbum(idAlbum: number, token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http
        .get<any>(`${this.apiUrl}/publicaciones/album/${idAlbum}`, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Error al obtener los datos de los seguidos', error);
            return throwError('Error al obtener los datos del usuario');
          })
        );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }


  getPublicacionesSeguidos(idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/publicaciones/seguidores/${idUsuario}`;
    return this.http.get(url);
  }

  //CAMARAS
  getCamaras(token: string): Observable<Camara[]> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<any[]>(`${this.apiUrl}/camaras`, { headers });
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  getCamara(id: number, token: string): Observable<Camara> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<Camara>(`${this.apiUrl}/camaras/${id}`, { headers });
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }
  crearCamara(camara: FormData, token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      const url = `${this.apiUrl}/camaras`;
      return this.http.post(url, camara, { headers });
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

  eliminarCamara(id: number, token: string): Observable<void> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.http.delete<void>(`${this.apiUrl}/camaras/${id}`, { headers });
  } else {
    return throwError('Token de autenticación nulo');
  }
  }

  //ALBUMES
  getAlbumes(token: string): Observable<Album[]> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<any[]>(`${this.apiUrl}/albumes`, { headers });
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  getAlbum(id: number, token: string): Observable<Album> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<Album>(`${this.apiUrl}/albumes/${id}`, { headers });
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  //REACCIONES
  // Crear una nueva publicación
  crearReaccion(formData: Reacciones, token: string): Observable<Reacciones> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.post<Reacciones>(`${this.apiUrl}/reacciones`, formData, {
        headers,
      });
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  // Eliminar una publicación
  eliminarReaccion(
    userId: number,
    publicacionId: number,
    token: string
  ): Observable<void> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete<void>(
        `${this.apiUrl}/reacciones/${userId}/${publicacionId}`,
        { headers }
      );
    } else {
      // Manejar el caso cuando el token es null
      // Por ejemplo, puedes devolver un Observable vacío o lanzar un error
      return throwError('Token de autenticación nulo');
    }
  }

  getNumReacciones(idPublicacion: number, token: string): Observable<any> {
    if (token !== null) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http
        .get<any>(`${this.apiUrl}/reacciones/numero/${idPublicacion}`, {
          headers,
        })
        .pipe(
          catchError((error: any) => {
            console.error(
              'Error al obtener los datos de las reacciones',
              error
            );
            return throwError('Error al obtener los datos de la publicacion');
          })
        );
    } else {
      return throwError('Token de autenticación nulo');
    }
  }

  darMeGusta(publicacionId: number, usuarioId: number) {
    const url = `${this.apiUrl}/me-gusta`;

    return this.http.post(url, { publicacionId, usuarioId });
  }

  quitarMeGusta(publicacionId: number, usuarioId: number) {
    const url = `${this.apiUrl}/no-me-gusta`;

    return this.http.delete(url, { body: { publicacionId, usuarioId } });
  }

  verificarMeGusta(
    usuarioId: number,
    publicacionId: number
  ): Observable<boolean> {
    const url = `${this.apiUrl}/verificar-megusta/${usuarioId}/${publicacionId}`;
    return this.http.get<boolean>(url);
  }
}
