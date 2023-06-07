import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface AvailabilityResponse {
  available: boolean;
  error?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  fecha_registro: string = '';

  emailExists: boolean = false;
  userExists: boolean = false;
  emailAvailabilityError: string = '';
  userAvailabilityError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      user: ['', Validators.required],
      password: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      foto_perfil: ['']
    });
  }

  register() {
    if (this.registerForm.invalid) {
      // Marcar los campos del formulario como tocados para mostrar los mensajes de error
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.registerForm.value['nombre']);
    formData.append('apellidos', this.registerForm.value['apellidos']);
    formData.append('sexo', this.registerForm.value['sexo']);
    formData.append('email', this.registerForm.value['email']);
    formData.append('user', this.registerForm.value['user']);
    formData.append('password', this.registerForm.value['password']);
    formData.append('fecha_nac', this.registerForm.value['fecha_nac'].toString());
    formData.append('fecha_registro', this.fecha_registro);
    if (this.selectedFile) {
      formData.append('foto_perfil', this.selectedFile);
    }

    this.authService.checkEmailAvailability(this.registerForm.value['email']).subscribe(
      (emailResponse: AvailabilityResponse) => {
        if (emailResponse.available) {
          this.authService.checkUserAvailability(this.registerForm.value['user']).subscribe(
            (userResponse: AvailabilityResponse) => {
              if (userResponse.available) {
                this.authService.register(formData).subscribe(
                  (response) => {
                    console.log('Usuario registrado');
                    this.router.navigate(['/login']);
                  },
                  (error) => {
                    console.error('Error al registrar usuario', error);
                  }
                );
              } else {
                this.userExists = true;
                this.userAvailabilityError = userResponse.error || '';
                console.log(this.userAvailabilityError)
              }
            },
            (error) => {
              console.error('Error al verificar disponibilidad del usuario', error);
            }
          );
        } else {
          this.emailExists = true;
          this.emailAvailabilityError = emailResponse.error || '';
          console.log(this.emailAvailabilityError);
        }
      },
      (error) => {
        console.error('Error al verificar disponibilidad del correo electrónico', error);
      }
    );
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
