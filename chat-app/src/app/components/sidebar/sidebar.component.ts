import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  users = [
    { id: 'user1', name: 'Alice' },
    { id: 'user2', name: 'Bob' }
  ];

  channels = ['general', 'random'];

  constructor(private router: Router) {}

  openPrivateChat(userId: string) {
    this.router.navigate(['/chat/private', userId]);
  }

  openChannel(channelId: string) {
    this.router.navigate(['/chat/channel', channelId]);
  }
}
