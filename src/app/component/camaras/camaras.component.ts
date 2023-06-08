import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camara } from 'src/app/models/Camara';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-camaras',
  templateUrl: './camaras.component.html',
  styleUrls: ['./camaras.component.scss'],
})
export class CamarasComponent implements OnInit {
  camaras: Camara[] = [];
  showModal: boolean = false;
  userRole = localStorage.getItem('userRole');


  marca: string = '';
  modelo: string = '';
  descripcion: string = '';
  valoracion: number = 0;

  constructor(
    private publicacionService: PublicacionesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
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

  verDetalles(idPublicacion: number) {
    this.router.navigate([`/camara/${idPublicacion}`]);
  }

  eliminarCamara(idCamara: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cámara?')) {
      const verificationToken = localStorage.getItem('verificationToken');

      if (verificationToken !== null) {
      this.publicacionService.eliminarCamara(idCamara,verificationToken).subscribe(
        () => {
          this.toastr.success('Has eliminado la camara.', 'Hecho');
          this.camaras = this.camaras.filter((camara) => camara.id !== idCamara);
        },
        (error) => {
          this.toastr.error(error, 'Error al eliminar la camara');

          console.error('Error al eliminar la cámara', error);
        }
      );
    }
  } else {
    // Manejar el caso cuando el token de verificación es null
    console.error('Token de verificación nulo');
  }
  }

  abrirModalCrearCamara() {
    this.showModal = true;
  }

  cerrarModalCrearCamara() {
    this.showModal = false;
  }

  crearCamara(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      const formData = new FormData();
      formData.append('marca', this.marca);
      formData.append('modelo', this.modelo);
      formData.append('descripcion', this.descripcion);
      formData.append('valoracion', String(this.valoracion));

      this.publicacionService
        .crearCamara(formData, verificationToken)
        .subscribe(
          (response) => {
            // Manejar la respuesta del servidor
            this.toastr.success('Camara creada con exito');

            console.log('Camara creada');
            this.cerrarModalCrearCamara();
          },
          (error) => {
            // Manejar el error
            this.toastr.error(error, 'Error al crear la camara');

            console.error('Error al crear la camara', error);
          }
        );
    } else {
      // Manejar el caso cuando el token de verificación es null
      console.error('Token de verificación nulo');
    }
  }
}
