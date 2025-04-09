import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';  // Import de la page de chat
import { authGuard } from './guards/auth.guard'; 

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'chat',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'channel/general', pathMatch: 'full' }, // ✅ redirection automatique
      { path: 'private/:uid', component: ChatPageComponent },
      { path: 'channel/:cid', component: ChatPageComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
