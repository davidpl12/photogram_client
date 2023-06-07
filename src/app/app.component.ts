import { Component } from '@angular/core';
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'photogram_client';

  guardianActivado: boolean = true;

  constructor(private authGuard: AuthGuard) {
    this.guardianActivado = this.authGuard.isLoggedIn();
    console.log(this.guardianActivado)
  }
}
