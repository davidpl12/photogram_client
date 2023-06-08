import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/models/Album';
import { Publicacion } from 'src/app/models/Publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent {

  public album: Album | undefined;
  public publicaciones: Publicacion[] = [];
  url: string = "http://127.0.0.1:8000/img/publicaciones/";

  constructor(private publicacionesService: PublicacionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.cargarAlbum();
    this.cargarPublicaciones();
  }
  cargarAlbum(): void{
    const verificationToken = localStorage.getItem('verificationToken');

    if (verificationToken !== null) {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.publicacionesService.getAlbum(id, verificationToken).subscribe((album) => this.album = album)
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
        this.publicacionesService.getPublicacionesbyAlbum(id, verificationToken).subscribe((publicaciones) => this.publicaciones = publicaciones)
      }
    });
  }
}






}
