import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private location: Location, private app: AppComponent,     private toastr: ToastrService
    ) {

    if (this.app.guardianActivado === true) {
      this.router.navigate(['/inicio'])
    }
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Aquí obtienes la respuesta de la API después del inicio de sesión exitoso
        const verificationToken = response.access_token;
        const id = response.id;
        const rol_id = response.userRole;
        this.toastr.success('Has iniciado sesion correctamente');



        // Guardar el token en el almacenamiento local
        localStorage.setItem('verificationToken', verificationToken);
        localStorage.setItem('userRole', rol_id);
        localStorage.setItem('id_user', id);
        this.app.guardianActivado = true;
        console.log('test>>>', this.app.guardianActivado)
        // Resto de la lógica después del inicio de sesión exitoso
        this.router.navigate(['/inicio']);

        // window.location.reload();



      },
      (error) => {
        // Aquí manejas los errores en caso de que ocurran durante el inicio de sesión
        console.error(error);
        this.toastr.error("El email o la contraseña no son correctos", 'Error');

      }
    );
  }



}
