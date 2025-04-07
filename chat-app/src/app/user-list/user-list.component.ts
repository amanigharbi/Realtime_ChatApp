import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDatabase, onValue, ref } from '@angular/fire/database';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  ngOnInit() {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      this.users = data ? Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value
      })) : [];
    });
  }
}
