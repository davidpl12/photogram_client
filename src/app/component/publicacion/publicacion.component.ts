import { Component,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Camara } from 'src/app/models/Camara';
import { Album } from 'src/app/models/Album';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { NgForm, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent {
  publishForm: FormGroup;
  modalOpen: boolean = true;
  camaras: Camara[] = [];
  albumes: Album[] = [];
  autor: any = '';
  // descripcion: any = '';
  // lugarRealizacion: any = '';
  // licencia: any = '';
  // camara: any = '';
  imagen: File | null = null;
  // album: any = '';
  numReacciones: number = 0;
  mostrarMensaje: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private publicacionService: PublicacionesService,
    private location: Location,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.publishForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      lugarRealizacion: ['', Validators.required],
      licencia: ['', Validators.required],
      camara: ['', Validators.required],
      album: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarCamaras();
    this.cargarAlbumes();
    this.toastr.warning('La imagen debe ocupar menos de 3MB.', 'Atención');

  }

  crearPublicacion(): void {
    const verificationToken = localStorage.getItem('verificationToken');
    const autor_id = localStorage.getItem('id_user');

    if (this.publishForm.invalid) {
      this.markFormGroupTouched(this.publishForm);
      this.toastr.error('Comprueba que tengas todos los campos rellenos', 'No se ha podido crear');
      return;
    }
    if (verificationToken !== null && autor_id) {

      const formData = new FormData();
      formData.append('autor', autor_id);
      formData.append('descripcion', this.publishForm.value["descripcion"]);
      formData.append('lugar_realizacion', this.publishForm.value["lugarRealizacion"]);
      formData.append('licencia', this.publishForm.value["licencia"]);
      formData.append('camara', this.publishForm.value["camara"]);
      if (this.imagen) {
        formData.append('imagen', this.imagen);
      }
      formData.append('num_reacciones', '0');
      formData.append('album', this.publishForm.value["album"]);
      // formData.append('fecha_public', '');

      this.publicacionService
        .crearPublicacion(formData, verificationToken)
        .subscribe(
          (response) => {
            // Manejar la respuesta del servidor
            console.log('Publicación creada');
            this.toastr.success('La publicacion ha sido creada correctamente.', 'Correcto');
            this.router.navigate(['/inicio']);

            // this.publishForm.resetForm(); // Reiniciar el formulario
          },
          (error) => {
            this.toastr.error(error, 'Error');
            console.error('Error al crear la publicación', error);
          }
        );
    } else {
      // Manejar el caso cuando el token de verificación es null
      console.error('Token de verificación nulo');
    }
  }
  descripcion(arg0: string, descripcion: any) {
    throw new Error('Method not implemented.');
  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
    console.log('event', event.target.files[0]);
    if (event.target.files[0].size > 3145728) {
      this.toastr.error('La imagen ocupa más de 3MB.', 'Error');
      this.imagen = null;
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
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
