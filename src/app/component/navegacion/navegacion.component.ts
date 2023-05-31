import { Component } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent {
  url: string = "http://127.0.0.1:8000/img/publicaciones/";
  url_varios: string = "http://127.0.0.1:8000/img/varios/";

}
