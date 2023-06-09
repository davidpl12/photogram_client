import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { InicioPostComponent } from './component/inicio-post/inicio-post.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './component/register/register.component';
import { PublicacionComponent } from './component/publicacion/publicacion.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { NavegacionComponent } from './component/navegacion/navegacion.component';
import { CamarasComponent } from './component/camaras/camaras.component';
import { CamaraDetailComponent } from './component/camara-detail/camara-detail.component';
import { AlbumDetailComponent } from './component/album-detail/album-detail.component';
import { PublicacionDetailComponent } from './component/publicacion-detail/publicacion-detail.component';
import { LogoutComponent } from './component/logout/logout.component';


import { UsuariosComponent } from './component/usuarios/usuarios/usuarios.component';
import { UsuariosFormComponent } from './component/usuarios/usuarios-form/usuarios-form.component';
import { BusquedadComponent } from './component/usuarios/busquedad/busquedad.component';
import { PublicacionesComponent } from './component/publicaciones/publicaciones.component';
import { PublicacionesUpdateComponent } from './component/publicaciones-update/publicaciones-update.component';
import { MisFotosComponent } from './component/mis-fotos/mis-fotos.component';
import { ToastrModule } from 'ngx-toastr';
import { SeguidoresComponent } from './component/seguidores/seguidores.component';
import { SeguidosComponent } from './component/seguidos/seguidos.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioPostComponent,
    LoginComponent,
    RegisterComponent,
    PublicacionComponent,
    PerfilComponent,
    NavegacionComponent,
    CamarasComponent,
    CamaraDetailComponent,
    AlbumDetailComponent,
    PublicacionDetailComponent,
    LogoutComponent,
    UsuariosComponent,
    UsuariosFormComponent,
    BusquedadComponent,
    PublicacionesComponent,
    PublicacionesUpdateComponent,
    MisFotosComponent,
    SeguidoresComponent,
    SeguidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
