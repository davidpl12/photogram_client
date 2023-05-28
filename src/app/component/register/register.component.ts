import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})


export class RegisterComponent {
 selectedFile: File | null = null;
  nombre: string = '';
  apellidos: string = '';
  sexo: string = '';
  user: string = '';
  email: string = '';
  password: string = '';
  fecha_nac: Date = new Date();
  foto_perfil: File | null = null;
  fecha_registro: string = '';
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  register(): void {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('apellidos', this.apellidos);
    formData.append('sexo', this.sexo);
    formData.append('email', this.email);
    formData.append('user', this.user);
    formData.append('password', this.password);
    formData.append('fecha_nac', this.fecha_nac.toString());
    formData.append('fecha_registro', this.fecha_registro);
    if (this.selectedFile) {
      formData.append('foto_perfil', this.selectedFile);
    }
    this.authService.register(formData).subscribe(
      (response) => {
        console.log('Usuario registrado');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar usuario', error);
      }
    );
  }

  onFileSelected(event: any) {
    // Aquí puedes manejar el cambio de la foto de perfil
    // Por ejemplo, puedes obtener la imagen y realizar alguna acción con ella
    this.selectedFile = event.target.files[0];
  }
}
