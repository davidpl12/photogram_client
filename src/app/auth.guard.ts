import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }


  canActivate(): boolean {
    if (this.isLoggedIn()) {
      console.log("Hola, es correcto")
      return true;
    } else {
      console.log("No es correcto")

      this.router.navigate(['/login']);
      return false;
    }
  }

    isLoggedIn(): boolean {
    const token = localStorage.getItem('verificationToken');
    console.log(token);

    return !!token;
  }


}
