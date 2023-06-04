import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/models/Publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';
import { Seguidores } from 'src/app/models/Seguidores';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Camara } from 'src/app/models/Camara';
import { Album } from 'src/app/models/Album';

@Component({
  selector: 'app-inicio-post',
  templateUrl: './inicio-post.component.html',
  styleUrls: ['./inicio-post.component.scss'],
})
export class InicioPostComponent implements OnInit {
  isLoading: boolean = true;
  numReacciones: number = 0;

  publicaciones: Publicacion[] = [];
  userData: Usuario | undefined;
  autor: Usuario[] = [];
  camara: Camara[] = [];
  album: Album[] = [];
  seguidos: Seguidores[] = [];
  publiFiltradas: Publicacion[] = [];
  url: string = 'http://127.0.0.1:8000/img/publicaciones/';
  url_perfil: string = 'http://127.0.0.1:8000/img/perfil/';
  userRole = localStorage.getItem('userRole');
  publicacionesConUsuarios: any[] | undefined; // Array de publicaciones con nombres de usuarios

  constructor(
    private authService: AuthService,
    private publicacionService: PublicacionesService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.authService.getUserData(verificationToken).subscribe(
        (userData) => {
          this.userData = userData;

          const usuarioId = userData.id; // Obtener el ID del usuario desde los datos del usuario

          this.publicacionService
            .getSeguidos(usuarioId, verificationToken)
            .subscribe(
              (seguidos) => {
                this.seguidos = seguidos;
                this.seguidos.forEach((objeto) => {
                  {
                    this.publicacionService
                      .getAutorPublicacion(
                        objeto.usuario_recibe,
                        verificationToken
                      )
                      .subscribe(
                        (publicaciones) => {
                          this.publicaciones = publicaciones;
                          this.publicaciones.forEach((publicacion) => {
                            this.publiFiltradas.push(publicacion);

                            // Obtener el nombre del usuario que hizo la foto
                            const nombreUsuario = publicacion.autor;
                            console.log(nombreUsuario);
                          });
                        },
                        (error) => {
                          console.error(
                            'Error al obtener las publicaciones del usuario',
                            error
                          );
                        }
                      );
                  }
                });
                console.log(this.publiFiltradas);
                this.publiFiltradas.sort((a, b) => {
                  const fechaA = new Date(a.fecha_public);
                  const fechaB = new Date(b.fecha_public);
                  return fechaA.getTime() - fechaB.getTime();
                });

                console.log(this.publiFiltradas);

                // Obtener datos adicionales del autor
                this.usuariosService.getUsuarios(verificationToken).subscribe(
                  (autor) => {
                    this.autor = autor;
                    // Obtener datos adicionales de camara
                    this.publicacionService
                      .getCamaras(verificationToken)
                      .subscribe(
                        (camara) => {
                          this.camara = camara;
                          this.publicacionService
                            .getAlbumes(verificationToken)
                            .subscribe(
                              (album) => {
                                this.album = album;
                                console.log(this.album);

                                this.publicacionesConUsuarios =
                                  this.unirPublicacionesConUsuarios(
                                    this.publiFiltradas,
                                    this.autor,
                                    this.camara,
                                    this.album
                                  );
                                console.log(this.publicacionesConUsuarios);
                                this.isLoading = false;
                              },
                              (error) => {
                                console.error(
                                  'Error al obtener los datos del Album',
                                  error
                                );
                                this.isLoading = false;
                              }
                            );
                        },
                        (error) => {
                          console.error(
                            'Error al obtener los datos de la camara',
                            error
                          );
                        }
                      );
                  },
                  (error) => {
                    console.error(
                      'Error al obtener los datos del autor',
                      error
                    );
                  }
                );
              },
              (error) => {
                console.error(
                  'Error al obtener el numero de seguidores',
                  error
                );
              }
            );
        },
        (error) => {
          console.error('Error al obtener los datos del usuario', error);
        }
      );
    } else {
      console.error('Token de verificación nulo');
    }
  }
  unirPublicacionesConUsuarios(
    publicaciones: any[],
    usuarios: any[],
    camaras: any[],
    albumes: any[]
  ): any[] {
    return publicaciones.map((publicacion) => {
      const usuario = usuarios.find((u) => u.id === publicacion.autor);
      const camara = camaras.find((u) => u.id === publicacion.camara);
      const album = albumes.find((u) => u.id === publicacion.album);
      return {
        ...publicacion,
        user: usuario ? usuario.user : 'Anonimo',
        foto_perfil: usuario ? usuario.foto_perfil : 'user.png',
        camara_marca: camara ? camara.marca : 'Ninguna',
        camara_modelo: camara ? camara.modelo : 'Ninguno',
        album_nombre: album ? album.nombre_album : 'Ninguno',
      };
    });
  }

  public meGusta = false;

  agregarReaccion(userId: number, publicacionId: number) {
    const verificationToken = localStorage.getItem('verificationToken');

    // Crear un nuevo objeto de reacción
    const nuevaReaccion = {
      user: userId,
      publicacion: publicacionId,
      fecha_reaccion: new Date().toISOString(),
    };

    if (verificationToken !== null) {
      if (!this.meGusta) {
        // Llamar al servicio para crear la nueva reacción
        this.publicacionService
          .crearReaccion(nuevaReaccion, verificationToken)
          .subscribe(
            (respuesta) => {
              console.log('Se ha agregado una nueva reacción');
              this.meGusta = true; // Cambiar el estado de la reacción a "Me gusta"
            },
            (error) => {
              console.error('Error al agregar la reacción', error);
            }
          );
      } else {
        // Llamar al servicio para eliminar la reacción
        this.publicacionService
          .eliminarReaccion(userId, publicacionId, verificationToken)
          .subscribe(
            (respuesta) => {
              console.log('Se ha eliminado la reacción');
              this.meGusta = false; // Cambiar el estado de la reacción a "No me gusta"
            },
            (error) => {
              console.error('Error al eliminar la reacción', error);
            }
          );
      }
    }
  }

  obtenerNumReaccion(idPublicacion: number) {
    const verificationToken = localStorage.getItem('verificationToken');
    if (verificationToken !== null) {
      //GET NUMERO DE REACCIONES
      this.publicacionService
        .getNumReacciones(idPublicacion, verificationToken)
        .subscribe(
          (numReacciones) => {
            this.numReacciones = numReacciones.num_reacciones;
          },
          (error) => {
            console.error('Error al obtener el numero de seguidores', error);
          }
        );
    }
    //GET NUMERO DE REACCIONES
  }
}
