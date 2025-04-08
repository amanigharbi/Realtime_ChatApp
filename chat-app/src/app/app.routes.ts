import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';  // Import de la page de chat
import { authGuard } from './guards/auth.guard'; 

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] }, // Home page protégée
  { path: 'login', component: LoginComponent },  // Page de login
  { path: 'register', component: RegisterComponent },  // Page d'inscription
  {
    path: 'chat',
    component: ChatPageComponent,
    canActivate: [authGuard],  // Protéger l'accès à la page de chat
    children: [
      { path: 'private/:uid', component: ChatPageComponent },  // Chat privé avec un utilisateur
      { path: 'channel/:cid', component: ChatPageComponent },  // Chat dans un canal public
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
