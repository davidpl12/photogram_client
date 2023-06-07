import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Camara } from 'src/app/models/Camara';
import { Album } from 'src/app/models/Album';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})

export class PublicacionComponent {
  modalOpen: boolean = true;
  camaras: Camara[] = [];
  albumes: Album[] = [];

  autor: string = '';
  descripcion: string = '';
  lugarRealizacion: string = '';
  licencia: string = '';
  camara: string = '';
  imagen: File | null = null;
  numReacciones: number = 0;
  album: string = '';

  constructor(private publicacionService: PublicacionesService, private location: Location) {}

  ngOnInit(): void {

    this.cargarCamaras();
    this.cargarAlbumes();
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    // Regresar a la página anterior
  this.location.back();
  }

  crearPublicacion(): void {
    const verificationToken = localStorage.getItem('verificationToken');
    const autor_id = localStorage.getItem('id_user');

    if (verificationToken !== null && autor_id) {
    const formData = new FormData();
    formData.append('autor', autor_id);
    formData.append('descripcion', this.descripcion);
    formData.append('lugar_realizacion', this.lugarRealizacion);
    formData.append('licencia', this.licencia);
    formData.append('camara', this.camara);
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }
    formData.append('num_reacciones', String(this.numReacciones));
    formData.append('album', this.album);
    formData.append('fecha_public', new Date().toISOString());

    this.publicacionService.crearPublicacion(formData, verificationToken).subscribe(
      (response) => {
        // Manejar la respuesta del servidor
        console.log('Publicación creada');
        this.closeModal();

      },
      (error) => {
        // Manejar el error
        console.error('Error al crear la publicación', error);
      }
    );
  } else {
    // Manejar el caso cuando el token de verificación es null
    console.error('Token de verificación nulo');
  }
  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }

  cargarCamaras(){
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
  cargarAlbumes(){
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
