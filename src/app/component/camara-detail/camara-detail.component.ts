import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camara } from 'src/app/models/Camara';
import { Publicacion } from 'src/app/models/Publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-camara-detail',
  templateUrl: './camara-detail.component.html',
  styleUrls: ['./camara-detail.component.scss']
})
export class CamaraDetailComponent implements OnInit{
  public camara: Camara | undefined;
  public publicaciones: Publicacion[] = [];
  url: string = "http://127.0.0.1:8000/img/publicaciones/";

  constructor(private publicacionesService: PublicacionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCamara();
    this.cargarPublicaciones();
  }
  cargarCamara(): void{
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.publicacionesService.getCamara(id, verificationToken).subscribe((camara) => this.camara = camara)
      }
    });
  }
}
  cargarPublicaciones(): void{
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.publicacionesService.getPublicacionesbyCamara(id, verificationToken).subscribe((publicaciones) => this.publicaciones = publicaciones)
      }
    });
  }
}





  }
