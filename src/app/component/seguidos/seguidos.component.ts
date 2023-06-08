import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Seguidores } from 'src/app/models/Seguidores';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seguidos',
  templateUrl: './seguidos.component.html',
  styleUrls: ['./seguidos.component.scss']
})
export class SeguidosComponent {
  url: string = 'http://127.0.0.1:8000/img/perfil/';

  seguidos: Seguidores[] = [];
  users: Usuario[] = [];
  searchKeyword: string = '';
  id_envia = localStorage.getItem('id_user');

  constructor(private userService: UsuariosService,     private toastr: ToastrService
    ) {}

  ngOnInit(): void {    this.cargarSeguidores();
    this. cargarUsuarios();
    this.toastr.info('Se mostrará el listado de personas que sigues', 'Hecho');

  }

  cargarSeguidores() {
    const verificationToken = localStorage.getItem('verificationToken');
    if (this.id_envia && verificationToken) {
      console.log(this.id_envia);
      const usuarioEnviaId = parseInt(this.id_envia);
      this.userService
        .getSeguidos(usuarioEnviaId, verificationToken)
        .subscribe((response) => {
          this.seguidos = response;
        },
        error => console.log(error)
      );
    }
  }

  cargarUsuarios() {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken) {
      this.userService.getUsuarios(verificationToken).subscribe(
        (usuarios) => {this.users = usuarios
          this.checkSeguidores();},
        (error) => console.log(error)
      );
    }
  }


  checkSeguidores(): void {
    const verificationToken = localStorage.getItem('verificationToken');
    if (this.id_envia && verificationToken) {
      const usuarioEnviaId = parseInt(this.id_envia); // Reemplaza con el ID del usuario que envía la solicitud
      this.users.forEach((user: Usuario) => {
        const usuarioRecibeId = user.id; // Asume que el ID del usuario está disponible en la propiedad 'id'
        this.userService
          .verificarSeguidor(usuarioRecibeId, usuarioEnviaId, verificationToken)
          .subscribe(
            (response: any) => {
              user.siguiendo = response.siguiendo; // Asignar el resultado de la verificación al estado de seguimiento
              console.log("respuesta" + user.siguiendo)

            },
            (error: any) => {
              console.error(
                `Error al verificar el seguidor del usuario ${user.id}:`,
                error
              );
            }
          );
      });
    }
  }

  followUser(user: Usuario) {
    const verificationToken = localStorage.getItem('verificationToken');
    if (this.id_envia && verificationToken) {
      const usuarioEnviaId = parseInt(this.id_envia); // Reemplaza con el ID del usuario que envía la solicitud
      const usuarioRecibeId = user.id; // Asume que el ID del usuario está disponible en la propiedad 'id'

      if (user.siguiendo) {
        // Si ya lo sigue, dejar de seguirlo
        this.userService.dejarSeguir(usuarioRecibeId, usuarioEnviaId, verificationToken).subscribe(
          () => {
            this.toastr.success('Has dejado de seguir a este usuario', 'Hecho');

            user.siguiendo = false; // Actualizar el estado de seguimiento
          },
          (error: any) => {
            this.toastr.error(error, 'Error al dejar de seguir al usuario ${usuarioRecibeId}:');

            console.error(
              `Error al dejar de seguir al usuario ${usuarioRecibeId}:`,
              error
            );
          }
        );
      } else {
        // Si no lo sigue, seguirlo
        this.userService.seguir(usuarioRecibeId, usuarioEnviaId, verificationToken).subscribe(
          () => {
            this.toastr.success('Has empezado a seguir este usuario', 'Hecho');
            user.siguiendo = true; // Actualizar el estado de seguimiento
          },
          (error: any) => {
            this.toastr.error(error, 'Error al seguir al usuario ${usuarioRecibeId}:');

            console.error(
              `Error al seguir al usuario ${usuarioRecibeId}:`,
              error
            );
          }
        );
      }
    }
  }
}
