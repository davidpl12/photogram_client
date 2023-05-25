import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { InicioPostComponent } from './component/inicio-post/inicio-post.component';


const appRoutes: Routes = [
  { path: 'inicio', component: InicioPostComponent },
  { path: '**', component: InicioPostComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    InicioPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
