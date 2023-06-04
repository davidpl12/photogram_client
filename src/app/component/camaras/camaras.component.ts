import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camara } from 'src/app/models/Camara';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-camaras',
  templateUrl: './camaras.component.html',
  styleUrls: ['./camaras.component.scss'],
})
export class CamarasComponent {
  camara: Camara[] = [];

  constructor(
    private publicacionService: PublicacionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.publicacionService.getCamaras(verificationToken).subscribe(
        (camara) => {
          this.camara = camara;
        },
        (error) => {
          console.error('Error al obtener los datos de la camara', error);
        }
      );
    } else {
      console.error('Token de verificación nulo');
    }
  }

  verdetalles(idPublicacion: Number) {
    this.router.navigate([`/camara/${idPublicacion}`]);
  }
}
