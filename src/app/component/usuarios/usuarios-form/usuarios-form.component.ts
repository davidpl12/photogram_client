import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/Roles';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {
  usuario: Usuario | undefined ;
  usuarioId: number | undefined;
  modoEdicion: boolean = false;
  userRole = localStorage.getItem('userRole');


  fotoPerfil: File | null = null;


  roles: Roles[] = []

  constructor(private userService: UsuariosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    const verificationToken = localStorage.getItem('verificationToken');

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.usuarioId = params['id'];
        this.modoEdicion = true;
        this.cargarUsuario();
      }
    });

    this.cargarRoles();

  }
  cargarUsuario() {
    const verificationToken = localStorage.getItem('verificationToken');
    if(verificationToken && this.usuarioId ){

    this.userService.getUsuario(this.usuarioId, verificationToken).subscribe(
      usuario => this.usuario = usuario,
      error => console.log(error)
    );
    }
  }

  cargarRoles() {
    const verificationToken = localStorage.getItem('verificationToken');

    if(verificationToken)
    this.userService.getRoles(verificationToken).subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => console.log(error)
    );
  }

  guardarUsuario() {
    const verificationToken = localStorage.getItem('verificationToken');
    if(verificationToken && this.usuario ){
    if (this.usuario.id) {

      this.userService.actualizarUsuario(this.usuario,verificationToken).subscribe(
        () => {
          console.log(this.usuario);
          console.log('Usuario actualizado correctamente');
          if(this.userRole == "1"){
            this.router.navigate(['/usuarios']);

          }else
          {
            this.router.navigate(['/perfil']);

          }


        },
        error => console.log(error)
      );
    } else {
      this.userService.crearUsuario(this.usuario,verificationToken).subscribe(
        () => {
          console.log('Usuario creado correctamente');
          // Restablecer el formulario o redirigir a la lista de usuarios
        },
        error => console.log(error)
      );
    }
  }
  }
  onFileSelected(event: any) {
    this.fotoPerfil = event.target.files[0];
  }
}
