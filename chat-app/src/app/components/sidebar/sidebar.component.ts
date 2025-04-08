import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // pour la navigation vers le chat

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  users: any[] = [];
  publicChannels: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const db = getDatabase();

    // Récupérer les utilisateurs
    const usersRef = ref(db, 'users');
    onValue(usersRef, snapshot => {
      const data = snapshot.val();
      this.users = Object.entries(data || {}).map(([uid, user]: any) => ({
        uid,
        ...user
      }));
    });

    // Récupérer les canaux publics
    const channelsRef = ref(db, 'publicChannels');
    onValue(channelsRef, snapshot => {
      const data = snapshot.val();
      this.publicChannels = Object.entries(data || {}).map(([cid, channel]: any) => ({
        cid,
        ...channel
      }));
    });
  }

  // Naviguer vers la page de chat pour une conversation privée
  openChat(user: any) {
    const currentUserId = 'current_user_uid'; // remplace par le uid de l'utilisateur connecté
    const chatId = [currentUserId, user.uid].sort().join('_');
    this.router.navigate(['/chat', { uid: chatId }]);
  }

  // Naviguer vers un canal public
  openChannel(channel: any) {
    this.router.navigate(['/chat', { cid: channel.cid }]);
  }
}
