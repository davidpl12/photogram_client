import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuarios: Usuario[] = [];

  constructor(private userService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const verificationToken = localStorage.getItem('verificationToken');

    if(verificationToken){
    this.userService.getUsuarios(verificationToken).subscribe(
      usuarios => this.usuarios = usuarios,
      error => console.log(error)
    );
  }
  }

  eliminarUsuario(id: number) {
    const verificationToken = localStorage.getItem('verificationToken');
    if(verificationToken){

    this.userService.eliminarUsuario(id,verificationToken).subscribe(
      () => {
        console.log('Usuario eliminado correctamente');
        this.cargarUsuarios();
      },
      error => console.log(error)
    );
  }
}
  editarUsuario(id: number) {
    this.router.navigate(['/usuarios', id]);
}

}
