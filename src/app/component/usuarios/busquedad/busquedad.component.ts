import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-busquedad',
  templateUrl: './busquedad.component.html',
  styleUrls: ['./busquedad.component.scss'],
})
export class BusquedadComponent {
  url: string = 'http://127.0.0.1:8000/img/perfil/';

  users: Usuario[] = [];
  searchKeyword: string = '';
  id_envia = localStorage.getItem('id_user');

  constructor(private userService: UsuariosService) {}

  searchUsers() {
    if (this.searchKeyword) {
      this.userService.searchUsers(this.searchKeyword).subscribe(
        (data) => {
          this.users = data;
          this.checkSeguidores();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.users = [];
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
        this.userService
          .dejarSeguir(usuarioRecibeId, usuarioEnviaId)
          .subscribe(
            () => {
              user.siguiendo = false; // Actualizar el estado de seguimiento
            },
            (error: any) => {
              console.error(
                `Error al dejar de seguir al usuario ${usuarioRecibeId}:`,
                error
              );
            }
          );
      } else {
        // Si no lo sigue, seguirlo
        this.userService
          .seguir(usuarioRecibeId, usuarioEnviaId)
          .subscribe(
            () => {
              user.siguiendo = true; // Actualizar el estado de seguimiento
            },
            (error: any) => {
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
