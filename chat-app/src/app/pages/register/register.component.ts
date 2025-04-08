import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { getDatabase, ref, set } from '@angular/fire/database';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = '';
  password = '';
  displayName = '';
  errorMessage = ''; // 🔴 message d'erreur à afficher

  constructor(
    private auth: Auth,
    private router: Router,
    public themeService: ThemeService
  ) {}

  async onRegister() {
    this.errorMessage = ''; // Reset erreur

    // ✅ Vérification des champs
    if (!this.displayName || !this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    // ✅ Format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Adresse email invalide.';
      return;
    }

    // ✅ Sécurité : mot de passe trop court
    if (this.password.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }

    // ✅ Tentative d'inscription
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      await updateProfile(userCredential.user, { displayName: this.displayName });

      const db = getDatabase();
      await set(ref(db, `users/${userCredential.user.uid}`), {
        displayName: this.displayName,
        uid: userCredential.user.uid,
        online: true
      });

      this.router.navigate(['/']);
    } catch (err: any) {
      this.errorMessage = 'Erreur inscription : ' + err.message;
    }
  }
}
