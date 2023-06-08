import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/models/Album';
import { Camara } from 'src/app/models/Camara';
import { Publicacion } from 'src/app/models/Publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-publicaciones-update',
  templateUrl: './publicaciones-update.component.html',
  styleUrls: ['./publicaciones-update.component.scss']
})
export class PublicacionesUpdateComponent implements OnInit {
  publicacion: Publicacion | undefined;

  camaras: Camara[] = [];
  albumes: Album[] = [];

  autor: number = 0;
  descripcion: string = '';
  lugarRealizacion: string = '';
  licencia: string = '';
  camara: string = '';
  imagen: File | null = null;
  numReacciones: number = 0;
  album: string = '';

  id = 0;

  constructor(
    private publicacionService: PublicacionesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.cargarAlbumes();
    this.cargarCamaras();

    this.toastr.warning('La imagen no puede ocupar más de 3MB.', 'Atención');

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
    });

    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      // Obtener la publicación y datos relacionados del servicio
      this.publicacionService.getPublicacion(this.id, verificationToken).subscribe(
        (publicacion) => {
          this.autor = publicacion.autor;
          this.publicacion = publicacion;
          this.descripcion = publicacion.descripcion;
          this.lugarRealizacion = publicacion.lugar_realizacion;
          this.licencia = publicacion.licencia;
          this.camara = publicacion.camara;
          this.album = publicacion.album;
        },
        (error) => {
          console.error('Error al obtener la publicación', error);
        }
      );
    }
  }

  actualizarPublicacion(): void {

    // Construir el objeto FormData con los datos del formulario
    const formData = new FormData();
    if (this.autor) {
      formData.append('autor', String(this.autor));
    }
    formData.append('descripcion', this.descripcion);
    formData.append('lugar_realizacion', this.lugarRealizacion);
    formData.append('licencia', this.licencia);
    formData.append('camara', this.camara);
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }
    formData.append('album', this.album);

    console.log(formData);

    const verificationToken = localStorage.getItem('verificationToken');

    if (this.publicacion && verificationToken !== null) {
      // Llamar al servicio para actualizar la publicación
      this.publicacionService
        .actualizarPublicacion(this.publicacion.id, formData, verificationToken)
        .subscribe(
          (response) => {
            console.log('Publicación actualizada:', response);
            this.toastr.success('Publicación actualizada');

            if (this.publicacion) {

              // Redirigir a la página de detalles de la publicación actualizada
              this.router.navigate(['/publicacion', this.publicacion.id]);
            }
          },
          (error) => {
            this.toastr.error(error, 'Error al actualizar la publicación');

            console.error('Error al actualizar la publicación', error);
          }
        );
    }
  }

  onFileSelected(event: any): void {
    // Obtener el archivo seleccionado
    const file = event.target.files[0];
    this.imagen = file;
    if (event.target.files[0].size > 3145728) {
      this.toastr.error('La imagen ocupa más de 3MB.', 'Error');
    }
  }

  cargarCamaras() {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.publicacionService.getCamaras(verificationToken).subscribe(
        (camaras) => {
          this.camaras = camaras;
        },
        (error) => {
          console.error('Error al obtener los datos de las cámaras', error);
        }
      );
    } else {
      console.error('Token de verificación nulo');
    }
  }

  cargarAlbumes() {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.publicacionService.getAlbumes(verificationToken).subscribe(
        (albumes) => {
          this.albumes = albumes;
        },
        (error) => {
          console.error('Error al obtener los datos de los album', error);
        }
      );
    } else {
      console.error('Token de verificación nulo');
    }
  }
}

