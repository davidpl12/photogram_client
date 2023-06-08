import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
  this.logout();

  }
  logout() {
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
      this.authService.logout(verificationToken).subscribe(
        (response: any) => {
          localStorage.removeItem('verificationToken');
          this.router.navigate(['/login']);
          window.location.reload();
          this.toastr.success('Cierre de sesión exitoso');

          console.log(response.message); // Mostrar la respuesta en la consola
        },
        (error: any) => {
          console.error(error); // Mostrar el error en la consola
        });

    } else {
      console.error('Token de verificación nulo');
    }
  }

}
