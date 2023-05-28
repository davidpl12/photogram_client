import { Component } from '@angular/core';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})

export class PublicacionComponent {
  autor: string = '';
  descripcion: string = '';
  lugarRealizacion: string = '';
  licencia: string = '';
  camara: string = '';
  imagen: File | null = null;
  numReacciones: number = 0;
  album: string = '';

  constructor(private publicacionService: PublicacionesService) {}

  crearPublicacion(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
    const formData = new FormData();
    formData.append('autor', this.autor);
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
}
