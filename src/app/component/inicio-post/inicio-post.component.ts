import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/models/Publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/Usuario';
import { Seguidores } from 'src/app/models/Seguidores';

@Component({
  selector: 'app-inicio-post',
  templateUrl: './inicio-post.component.html',
  styleUrls: ['./inicio-post.component.scss']
})
export class InicioPostComponent implements OnInit{
  publicaciones: Publicacion[] = [];
  userData: Usuario | undefined;
  seguidos : Seguidores[] = [] ;
  publiFiltradas : Publicacion[] = [] ;
  url: string = "http://127.0.0.1:8000/img/publicaciones/";
  userRole = localStorage.getItem('userRole');


  constructor(
    private authService: AuthService,
    private publicacionService: PublicacionesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.authService.getUserData(verificationToken).subscribe(
        (userData) => {
          this.userData = userData;

          const usuarioId = userData.id; // Obtener el ID del usuario desde los datos del usuario

          this.publicacionService.getSeguidos(usuarioId, verificationToken).subscribe(
            (seguidos) => {

              this.seguidos = seguidos;
              this.seguidos.forEach(objeto => { {

                this.publicacionService.getAutorPublicacion(objeto.usuario_recibe, verificationToken).subscribe(
                  (publicaciones) => {
                    this.publicaciones = publicaciones;
                    this.publicaciones.forEach(usuario => {
                      this.publiFiltradas.push(usuario);

                    });
                  },
                  (error) => {
                    console.error('Error al obtener las publicaciones del usuario', error);
                  }
                );

              }


            });
            console.log(this.publiFiltradas);
            this.publiFiltradas.sort((a, b) => {
              const fechaA = new Date(a.fecha_public);
              const fechaB = new Date(b.fecha_public);
              return fechaA.getTime() - fechaB.getTime();
            });

            console.log(this.publiFiltradas);
            },
            (error) => {
              console.error('Error al obtener el numero de seguidores', error);
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

}
