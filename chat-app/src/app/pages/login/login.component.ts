import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = ''; // 🔴 Pour afficher l'alerte Bootstrap

  constructor(
    private auth: Auth,
    private router: Router,
    public themeService: ThemeService
  ) {}

  onLogin() {
    this.errorMessage = ''; // reset erreur

    // ✅ Vérifications manuelles
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    // ✅ Vérification de format email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Adresse email invalide.';
      return;
    }

    // ✅ Tentative de connexion
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => this.router.navigate(['/']))
      .catch(err => {
        // 🔴 Erreur Firebase
        this.errorMessage = 'Erreur : ' + err.message;
      });
  }
}
