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
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio-post',
  templateUrl: './inicio-post.component.html',
  styleUrls: ['./inicio-post.component.scss'],
})
export class InicioPostComponent implements OnInit {
  isLoading: boolean = true;
  //numReacciones: number = 0;

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
  usuario_id = localStorage.getItem('id_user');
  publicacionesConUsuarios: any[] | undefined; // Array de publicaciones con nombres de usuarios

  constructor(
    private authService: AuthService,
    private publicacionService: PublicacionesService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private toastr: ToastrService

  ) {
    moment.locale('es');
  }

  ngOnInit(): void {
    //this.obtenerNumReaccion(this.publicacionId);
    if (this.usuario_id) {
      const idUsuario = parseInt(this.usuario_id);

      this.getPublicacionesSeguidos(idUsuario);
      this.cargarCamaras();
      this.cargarAlbumes();
      this.cargarUsuarios();
    }
    this.isLoading = false;
    this.toastr.info('Puedes reaccionar a la imagen pulsando en el corazón y así ayudar a los demas usuarios a saber tu opinion', 'Ayuda');
  }

  getPublicacionesSeguidos(idUsuario: number) {
    this.publicacionService.getPublicacionesSeguidos(idUsuario).subscribe(
      (publicacion) => {
        this.publicaciones = publicacion;

        this.publicaciones.forEach((publicacion) => {
          const horaHace = moment(publicacion.created_at)
          .startOf('hour')
          .fromNow();
        publicacion.fecha_public = horaHace;

        this.verificarMeGusta(publicacion);
        this.obtenerNumReaccion(publicacion);
        });


      },
      (error) => {
        console.log(error);
      }
    );
  }

  cargarCamaras(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.publicacionService.getCamaras(verificationToken).subscribe(
        (camaras) => {
          this.camara = camaras;
        },
        (error) => {
          console.error('Error al obtener los datos de las cámaras', error);
        }
      );
    } else {
      console.error('Token de verificación nulo');
    }
  }
  cargarAlbumes(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.publicacionService.getAlbumes(verificationToken).subscribe(
        (albumes) => {
          this.album = albumes;
        },
        (error) => {
          console.error('Error al obtener los datos de las cámaras', error);
        }
      );
    } else {
      console.error('Token de verificación nulo');
    }
  }

  cargarUsuarios() {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken) {
      this.usuariosService.getUsuarios(verificationToken).subscribe(
        (usuarios) => (this.autor = usuarios),
        (error) => console.log(error)
      );
    }
  }


  darMeGusta(publicacion: any) {
    if (publicacion && publicacion.id) {
      const publicacionId = publicacion.id;
      if (this.usuario_id) {
        this.publicacionService
          .darMeGusta(publicacionId, parseInt(this.usuario_id))
          .subscribe(
            (response: any) => {
              console.log(response.message);
              publicacion.meGusta = true;
              this.obtenerNumReaccion(publicacion);
            },
            (error: any) => {
              console.error('Error al dar "me gusta":', error);
            }
          );
      }
    }
  }

  quitarMeGusta(publicacion: any) {
    if (publicacion && publicacion.id) {
      const publicacionId = publicacion.id;
      if (this.usuario_id) {
        this.publicacionService
          .quitarMeGusta(publicacionId, parseInt(this.usuario_id))
          .subscribe(
            (response: any) => {
              console.log(response.message);
              publicacion.meGusta = false;
              this.obtenerNumReaccion(publicacion);
            },
            (error: any) => {
              console.error('Error al quitar "me gusta":', error);
            }
          );
      }
    }
  }

  verificarMeGusta(publicacion: any): void {
    const publicacionId = publicacion.id;
    const usuarioId = this.usuario_id;
    if (usuarioId) {
      this.publicacionService
        .verificarMeGusta(parseInt(usuarioId), parseInt(publicacionId))
        .subscribe(
          (response: boolean) => {
            publicacion.meGusta = response;
          },
          (error: any) => {
            console.error(
              `Error al verificar si te gusta la publicación ${publicacionId}:`,
              error
            );
          }
        );
    }
  }

  obtenerNumReaccion(publicacion: any) {
    const idPublicacion = publicacion.id;
    const verificationToken = localStorage.getItem('verificationToken');
    if (verificationToken !== null) {
      // GET NUMERO DE REACCIONES
      this.publicacionService
        .getNumReacciones(idPublicacion, verificationToken)
        .subscribe(
          (numReacciones) => {
            publicacion.num_reacciones = numReacciones.num_reaccion;

          },
          (error) => {
            console.error('Error al obtener el numero de seguidores', error);
          }
        );
    }
    // GET NUMERO DE REACCIONES
  }
}
