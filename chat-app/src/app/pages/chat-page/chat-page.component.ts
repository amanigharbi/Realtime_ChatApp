import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Importe les composants enfants
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ChatBoxComponent } from '../../components/chat-box/chat-box.component';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    ChatBoxComponent
  ],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {
  chatType: 'private' | 'channel' = 'private';
  targetId: string | null = null;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, public themeService: ThemeService) {
    this.route.params.subscribe(params => {
      if (params['uid']) {
        this.chatType = 'private';
        this.targetId = params['uid'];
        console.log('Chat privé avec', this.targetId);
      } else if (params['cid']) {
        this.chatType = 'channel';
        this.targetId = params['cid'];
        console.log('Canal public :', this.targetId);
      }
    });
  }
  username = '';
  private authService = inject(AuthService);

  ngOnInit(): void {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.username = currentUser.email?.split('@')[0] ?? 'User';
    }
  
    // 🔁 Sécurité : rediriger si pas de paramètre
    this.route.params.subscribe(params => {
      if (!params['uid'] && !params['cid']) {
        this.router.navigate(['/chat/channel/general']);
      }
    });
  }

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
