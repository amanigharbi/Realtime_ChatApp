import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue, off } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  online: boolean;
  lastSeen: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  getAllUsers(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      const db = getDatabase();
      const usersRef = ref(db, 'users');

      const unsubscribe = onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const users: User[] = [];

        if (data) {
          for (const uid in data) {
            if (data.hasOwnProperty(uid)) {
              const userData = data[uid];
              users.push({ uid, ...userData });
            }
          }
        }

        observer.next(users);
      });

      // Teardown logic (bonne pratique)
      return () => off(usersRef, 'value', unsubscribe);
    });
  }
}
