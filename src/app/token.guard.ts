import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.hasToken()) {
      this.router.navigate(['/inicio']); // Redirige a la página de redirección cuando hay un token presente
      console.log('he entrado en no');

      return false; // Bloquea el acceso a la ruta actual
    } else {
      console.log('he entrado en si');
      return true; // Permite el acceso a la ruta actual cuando no hay token presente
    }
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('verificationToken');
    return !!token; // Devuelve true si hay un token presente, false en caso contrario
  }
}
