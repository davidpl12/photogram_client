import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { InicioPostComponent } from './component/inicio-post/inicio-post.component';
import { RegisterComponent } from './component/register/register.component';
import { PublicacionComponent } from './component/publicacion/publicacion.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PublicacionesComponent } from './component/publicaciones/publicaciones.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { CamarasComponent } from './component/camaras/camaras.component';
import { CamaraDetailComponent } from './component/camara-detail/camara-detail.component';
import { AlbumDetailComponent } from './component/album-detail/album-detail.component';
import { PublicacionDetailComponent } from './component/publicacion-detail/publicacion-detail.component';
import { PublicacionesUpdateComponent } from './component/publicaciones-update/publicaciones-update.component';
import { UsuariosComponent } from './component/usuarios/usuarios/usuarios.component';
import { UsuariosFormComponent } from './component/usuarios/usuarios-form/usuarios-form.component';
import { BusquedadComponent } from './component/usuarios/busquedad/busquedad.component';
import { MisFotosComponent } from './component/mis-fotos/mis-fotos.component';
import { SeguidoresComponent } from './component/seguidores/seguidores.component';
import { SeguidosComponent } from './component/seguidos/seguidos.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenGuard } from './guards/token.guard';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
