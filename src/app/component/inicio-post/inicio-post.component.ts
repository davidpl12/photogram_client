import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-inicio-post',
  templateUrl: './inicio-post.component.html',
  styleUrls: ['./inicio-post.component.scss']
})
export class InicioPostComponent implements OnInit{
  publicaciones: any[] | undefined; // Propiedad para almacenar las publicaciones
  url: string = "http://127.0.0.1:8000/img/publicaciones/";

  constructor(private publicacionService: PublicacionesService) { }

  ngOnInit(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.publicacionService.getPublicaciones(verificationToken).subscribe(
        (response) => {
          this.publicaciones = response;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Manejar el caso cuando el token de verificación es null
      console.error('Token de verificación nulo');
    }
  }
}
