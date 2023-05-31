import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { InicioPostComponent } from './component/inicio-post/inicio-post.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './component/register/register.component';
import { PublicacionComponent } from './component/publicacion/publicacion.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { NavegacionComponent } from './component/navegacion/navegacion.component';


const appRoutes: Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: 'publicacion', component: PublicacionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioPostComponent },
  { path: '**', component: InicioPostComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    InicioPostComponent,
    LoginComponent,
    RegisterComponent,
    PublicacionComponent,
    PerfilComponent,
    NavegacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    FormsModule ,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
