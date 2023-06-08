import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];

  constructor(
    private userService: UsuariosService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken) {
      this.userService.getUsuarios(verificationToken).subscribe(
        (usuarios) => (this.usuarios = usuarios),
        (error) => console.log(error)
      );
    }
  }

  eliminarUsuario(id: number) {
    const verificationToken = localStorage.getItem('verificationToken');
    if (verificationToken) {
      this.userService.eliminarUsuario(id, verificationToken).subscribe(
        () => {
          this.toastr.success('Usuario borrado con éxito', 'Hecho');
          console.log('Usuario eliminado correctamente');
          this.cargarUsuarios();
        },
        (error) => {console.log(error);     this.toastr.error(error, 'Error');
      }
      );
    }
  }
  editarUsuario(id: number) {
    this.router.navigate(['/usuarios', id]);
  }
}
