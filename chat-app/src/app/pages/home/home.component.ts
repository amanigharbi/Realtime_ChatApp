import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { UserListComponent } from '../../user-list/user-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  template: `
    <div class="home">
      <h1>Bienvenue dans le Chat ! 🎉</h1>
      <button (click)="logout()">Déconnexion</button>
    </div>
  `,
  styles: [`
    .home {
      text-align: center;
      padding: 2rem;
    }
  `]
})
export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) {}

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
