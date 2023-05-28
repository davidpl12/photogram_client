import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Aquí obtienes la respuesta de la API después del inicio de sesión exitoso
        const verificationToken = response.access_token;

        // Guardar el token en el almacenamiento local
        localStorage.setItem('verificationToken', verificationToken);

        // Resto de la lógica después del inicio de sesión exitoso
        this.router.navigate(['/inicio']);
      },
      (error) => {
        // Aquí manejas los errores en caso de que ocurran durante el inicio de sesión
        console.error(error);
      }
    );
  }

}
