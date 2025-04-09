import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  selectedUser: any = null;
  selectedChannel: any = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

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

      // Vérifie s’il faut sélectionner un utilisateur
      const uid = this.route.snapshot.params['uid'];
      if (uid) {
        this.selectedUser = this.users.find(u => u.uid === uid);
        this.selectedChannel = null;
      }
    });

    // Récupérer les canaux publics
    const channelsRef = ref(db, 'publicChannels');
    onValue(channelsRef, snapshot => {
      const data = snapshot.val();
      this.publicChannels = Object.entries(data || {}).map(([cid, channel]: any) => ({
        cid,
        ...channel
      }));

      const routeCid = this.route.snapshot.params['cid'];

      // Cas spécial : /chat/channel/general
      if (!this.route.snapshot.params['uid'] && routeCid === 'general') {
        const general = this.publicChannels.find(c =>
          c.name.toLowerCase() === 'général' || c.name.toLowerCase() === 'general'
        );
        if (general) {
          this.selectedChannel = general;
          this.selectedUser = null;
        }
      } else if (routeCid) {
        const found = this.publicChannels.find(c => c.cid === routeCid);
        if (found) {
          this.selectedChannel = found;
          this.selectedUser = null;
        }
      }
    });
  }

  openChat(user: any) {
    this.selectedUser = user;
    this.selectedChannel = null;
    const currentUserId = 'current_user_uid'; 
    const chatId = [currentUserId, user.uid].sort().join('_');
    this.router.navigate(['/chat', { uid: chatId }]);
  }

  openChannel(channel: any) {
    this.selectedChannel = channel;
    this.selectedUser = null;
    this.router.navigate(['/chat', { cid: channel.cid }]);
  }
}
