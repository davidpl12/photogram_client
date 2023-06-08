import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Roles } from 'src/app/models/Roles';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {
  usuario: any = {} ;
  usuarioId: number | undefined;
  modoEdicion: boolean = false;
  userRole = localStorage.getItem('userRole');


  selectedFile: File | null = null;


  roles: Roles[] = []

  constructor(private userService: UsuariosService, private route: ActivatedRoute, private router: Router,     private toastr: ToastrService
    ) { }

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

      const formData = new FormData();
      formData.append('nombre', this.usuario.nombre);
      formData.append('apellidos', this.usuario.apellidos);
      formData.append('sexo', this.usuario.sexo);
      formData.append('email', this.usuario.email);
      formData.append('user', this.usuario.user);
      formData.append('password', this.usuario.password);
      const fechaNac = this.usuario.fecha_nac.toString();
      const rol = this.usuario.rol_id != null ? this.usuario.rol_id.toString() : '';
      formData.append('rol_id', rol);


      formData.append('fecha_nac', fechaNac);
      formData.append('rol_id', rol);

            if (this.selectedFile) {
        formData.append('foto_perfil', this.selectedFile);
      }

      this.userService.actualizarUsuario(formData, this.usuario.id, verificationToken).subscribe(
        () => {
          console.log(this.usuario);
          console.log('Usuario actualizado correctamente');
          this.toastr.success('Usuario actualizado correctamente', 'Perfecto');

          if(this.userRole == "1"){
            this.router.navigate(['/usuarios']);

          }else
          {
            this.router.navigate(['/perfil']);

          }


        },
        error => {console.log(error);
          this.toastr.error('No se ha podido actualizar el usuario', 'Error');
        }
      );
    } else {
      this.userService.crearUsuario(this.usuario,verificationToken).subscribe(
        () => {
          console.log('Usuario creado correctamente');
          this.toastr.success('Usuario creado correctamente', 'Perfecto');
        },
        (error) => {console.log(error);
          this.toastr.error('No se ha podido crear el usuario', 'Error');
        }

      );
    }
  }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
