import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/models/Publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent {
  url: string = 'http://127.0.0.1:8000/img/publicaciones/';

  usuarios: Publicacion[] = [];

  constructor(private publicacionService: PublicacionesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.cargarPublicaciones();

  }

  cargarPublicaciones() {
    const verificationToken = localStorage.getItem('verificationToken');

    if(verificationToken){
    this.publicacionService.getPublicaciones(verificationToken).subscribe(
      usuarios => this.usuarios = usuarios,
      error => console.log(error)
    );
  }
  }

  eliminarPublicaciones(id: number) {
    const verificationToken = localStorage.getItem('verificationToken');
    if(verificationToken){

    this.publicacionService.eliminarPublicacion(id,verificationToken).subscribe(
      () => {
        this.toastr.success('Publicacion eliminada correctamente', 'Hecho');

        console.log('publicacion eliminada correctamente');
        this.cargarPublicaciones();
      },
      error =>  this.toastr.error(error, 'Error')

    );
  }
}
  editarPublicaciones(id: number) {
    this.router.navigate(['/publicaciones', id]);
}

}
