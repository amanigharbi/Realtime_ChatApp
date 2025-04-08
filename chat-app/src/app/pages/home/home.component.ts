import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, UserListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(private auth: AuthService, private router: Router, public themeService: ThemeService) {}

  ngOnInit(): void {
    // Utilisez la propriété currentUser du service AuthService pour récupérer l'utilisateur connecté
    const user = this.auth.currentUser;
    this.username = user ? (user.displayName || user.email?.split('@')[0] || 'Utilisateur') : 'Utilisateur'; // Utilisation du displayName ou de l'email
  }

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
