import { Camara } from 'src/app/models/Camara';
import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Publicacion } from 'src/app/models/Publicacion';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/Album';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.component.html',
  styleUrls: ['./mis-fotos.component.scss'],
})
export class MisFotosComponent implements OnInit {
  usuarioId = localStorage.getItem('id_user');
  public camara: Camara[] = [];
  public album: Album[] = [];
  url: string = "http://127.0.0.1:8000/img/publicaciones/";

  public stateActive: boolean = true;

  public activo: boolean = true;
  public publicaciones: Publicacion[] = [];

  constructor(
    private usuarioService: UsuariosService,
    private publicacionService: PublicacionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.CargarPublicacionesUsuario();
    this.cargarCamaras();
    this.cargarAlbumes();
    this.toastr.info('Puedes cambiar la manera de ordenar tus fotos, seleccione la que mas te guste. albumes o camaras.', 'Ayuda');


  }

  CargarPublicacionesUsuario() {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null && this.usuarioId) {
      const usuario_id = parseInt(this.usuarioId);

      this.publicacionService
        .getAutorPublicacion(usuario_id, verificationToken)
        .subscribe(
          (publicaciones) => {
            this.publicaciones = publicaciones;
          },
          (error) => {
            console.error(
              'Error al obtener las publicaciones del usuario',
              error
            );
          }
        );
    }
  }

  cargarCamaras(): void{
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
  cargarAlbumes(): void{
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



existenPublicaciones(camaraId: number): boolean {
  return this.publicaciones.some(publicacion => +publicacion.camara === camaraId);
}

existenPublicacionesAlbum(albumId: number): boolean {
  return this.publicaciones.some(publicacion => +publicacion.album === albumId);
}

toggleMenu() {
  this.stateActive = !this.stateActive;
}

}
