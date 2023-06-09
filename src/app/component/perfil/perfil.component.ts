import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/models/Publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  userData: Usuario | undefined;
  numSeguidores: number = 0;
  numSeguidos: number = 0;
  url: string = 'http://127.0.0.1:8000/img/publicaciones/';
  url_perfil: string = 'http://127.0.0.1:8000/img/perfil/';
  userRole = localStorage.getItem('userRole');



  constructor(
    private authService: AuthService,
    private publicacionService: PublicacionesService,
    private route: ActivatedRoute,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.authService.getUserData(verificationToken).subscribe(
        (userData) => {
          this.userData = userData;

          const fechaActual = new Date();

          // Establece la fecha objetivo
          const fechaObjetivo = new Date( userData.fecha_nac);

          // Calcula la diferencia en milisegundos entre las dos fechas
          const diferencia =  fechaActual.getTime() - fechaObjetivo.getTime();

          // Convierte la diferencia de milisegundos a años
          const milisegundosPorDia = 1000 * 60 * 60 * 24 * 365.25;

          const aniosTranscurridos = Math.floor(diferencia / milisegundosPorDia);


          userData.fecha_nac= aniosTranscurridos;

          const usuarioId = userData.id; // Obtener el ID del usuario desde los datos del usuario

          this.publicacionService
            .getNumSeguidores(usuarioId, verificationToken)
            .subscribe(
              (numSeguidores) => {
                this.numSeguidores = numSeguidores.num_seguidores;
              },
              (error) => {
                console.error(
                  'Error al obtener el numero de seguidores',
                  error
                );
              }
            );
          this.publicacionService
            .getNumSeguidos(usuarioId, verificationToken)
            .subscribe(
              (numSeguidos) => {
                this.numSeguidos = numSeguidos.num_seguidos;
              },
              (error) => {
                console.error(
                  'Error al obtener el numero de seguidores',
                  error
                );
              }
            );

          this.publicacionService
            .getAutorPublicacion(usuarioId, verificationToken)
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
        },
        (error) => {
          console.error('Error al obtener los datos del usuario', error);
        }
      );
    } else {
      console.error('Token de verificación nulo');
    }
  }

  eliminarPublicaciones(id: number) {
    const verificationToken = localStorage.getItem('verificationToken');
    if(verificationToken){

    this.publicacionService.eliminarPublicacion(id,verificationToken).subscribe(
      () => {
        this.toastr.success('Publicacion eliminada correctamente', 'Hecho');

        console.log('publicacion eliminada correctamente');
      },
      error =>  this.toastr.error(error, 'Error')

    );
  }
}
}
