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

import { AuthGuard } from './auth.guard';
import { TokenGuard } from './token.guard';
import { UsuariosComponent } from './component/usuarios/usuarios/usuarios.component';
import { UsuariosFormComponent } from './component/usuarios/usuarios-form/usuarios-form.component';
import { BusquedadComponent } from './component/usuarios/busquedad/busquedad.component';
import { PublicacionesComponent } from './component/publicaciones/publicaciones.component';
import { PublicacionesUpdateComponent } from './component/publicaciones-update/publicaciones-update.component';
import { MisFotosComponent } from './component/mis-fotos/mis-fotos.component';
import { ToastrModule } from 'ngx-toastr';
import { SeguidoresComponent } from './component/seguidores/seguidores.component';
import { SeguidosComponent } from './component/seguidos/seguidos.component';



const appRoutes: Routes = [
  //{ path: 'perfil', component: PerfilComponent },
 // { path: 'perfil', component: PerfilComponent },
  { path: 'seguidos', component: SeguidosComponent, canActivate: [AuthGuard]  },
  { path: 'seguidores', component: SeguidoresComponent, canActivate: [AuthGuard]  },
  { path: 'mis-fotos', component: MisFotosComponent, canActivate: [AuthGuard]  },
  { path: 'busquedad', component: BusquedadComponent, canActivate: [AuthGuard]  },
  { path: 'usuarios/:id', component: UsuariosFormComponent, canActivate: [AuthGuard]  },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]  },
  { path: 'publicaciones/:id', component: PublicacionesUpdateComponent, canActivate: [AuthGuard]  },
  { path: 'publicacion/:id', component: PublicacionDetailComponent, canActivate: [AuthGuard]  },
  { path: 'album/:id', component: AlbumDetailComponent, canActivate: [AuthGuard]  },
  { path: 'camara/:id', component: CamaraDetailComponent, canActivate: [AuthGuard]  },
  { path: 'camara', component: CamarasComponent, canActivate: [AuthGuard]  },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]  },
  { path: 'publicaciones', component: PublicacionesComponent, canActivate: [AuthGuard] },
  { path: 'publicacion', component: PublicacionComponent, canActivate: [AuthGuard] },
  { path: 'logout', component:  LogoutComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [TokenGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [TokenGuard] },
  { path: 'inicio', component: InicioPostComponent,canActivate: [AuthGuard] },
  { path: '**', component: InicioPostComponent, canActivate: [AuthGuard]  },
]

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
    RouterModule.forRoot(appRoutes),
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
