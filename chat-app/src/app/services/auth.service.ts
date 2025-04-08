import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { getDatabase, ref, set, serverTimestamp, onDisconnect, update, onValue } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged(user => this.userSubject.next(user));
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string) {
    const userCred = await createUserWithEmailAndPassword(this.auth, email, password);
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userCred.user.uid);
  
    await set(userRef, {
      email: userCred.user.email,
      displayName: userCred.user.email?.split('@')[0],
      online: true,
      lastSeen: serverTimestamp()
    });
  
    this.setupPresence(userCred.user.uid); // Setup présence temps réel
  }
  setupPresence(uid: string) {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + uid);
    const connectedRef = ref(db, '.info/connected');
  
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        onDisconnect(userRef).update({
          online: false,
          lastSeen: serverTimestamp()
        });
  
        update(userRef, {
          online: true,
          lastSeen: serverTimestamp()
        });
      }
    });
  }
  
  logout() {
    return signOut(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }
 
}
