import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/models/Publicacion';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent {
  url: string = "http://127.0.0.1:8000/img/perfil/";
  url_varios: string = "http://127.0.0.1:8000/img/varios/";

  publicaciones: Publicacion[] = [];
  userData: Usuario | undefined;

  userRole = localStorage.getItem('userRole');



  constructor(
    private authService: AuthService,
    private publicacionService: PublicacionesService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.authService.getUserData(verificationToken).subscribe(
        (userData) => {
          this.userData = userData;


        });

    } else {
      console.error('Token de verificación nulo');
    }
  }



}

