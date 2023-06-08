import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/models/Publicacion';
import { Usuario } from 'src/app/models/Usuario';
import { Camara } from 'src/app/models/Camara';
import { Album } from 'src/app/models/Album';
import { Seguidores } from 'src/app/models/Seguidores';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-publicacion-detail',
  templateUrl: './publicacion-detail.component.html',
  styleUrls: ['./publicacion-detail.component.scss'],
})
export class PublicacionDetailComponent {
  isLoading: boolean = true;
  numReacciones: number = 0;

  publicaciones: Publicacion | undefined;
  usuario: Usuario | undefined;
  camara: Camara | undefined;
  album: Album | undefined;

  url: string = 'http://127.0.0.1:8000/img/publicaciones/';
  url_perfil: string = 'http://127.0.0.1:8000/img/perfil/';
  userRole = localStorage.getItem('userRole');
  // publicacionesConUsuarios: any[] | undefined; // Array de publicaciones con nombres de usuarios

  constructor(
    private authService: AuthService,
    private publicacionesService: PublicacionesService,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.cargarPublicaciones();
  }
  cargarPublicaciones(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.activatedRoute.params.subscribe((params) => {
        let id = params['id'];
        if (id) {
          this.publicacionesService
            .getPublicacion(id, verificationToken)
            .subscribe((publicaciones) => {
              this.publicaciones = publicaciones;
              this.cargarCamara(publicaciones.camara);
              this.cargarAlbum(publicaciones.album);
              this.cargarPersona(publicaciones.autor);
            });
        }
      });
    }
  }
  cargarCamara(id: any): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.activatedRoute.params.subscribe((params) => {
        //let id = params['id']
        if (id) {
          this.publicacionesService
            .getCamara(id, verificationToken)
            .subscribe((camara) => (this.camara = camara));
        }
      });
    }
  }
  cargarAlbum(id: any): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.activatedRoute.params.subscribe((params) => {
        //let id = params['id']
        if (id) {
          this.publicacionesService
            .getAlbum(id, verificationToken)
            .subscribe((album) => (this.album = album));
        }
      });
    }
  }
  cargarPersona(id: any): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.activatedRoute.params.subscribe((params) => {
        //let id = params['id']
        if (id) {
          this.usuariosService
            .getUsuario(id, verificationToken)
            .subscribe((usuario) => (this.usuario = usuario));
        }
      });
    }
  }
}
