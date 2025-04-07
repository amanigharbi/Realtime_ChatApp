import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from    '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ChatBoxComponent } from '../../components/chat-box/chat-box.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ChatBoxComponent, RouterModule],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {}
