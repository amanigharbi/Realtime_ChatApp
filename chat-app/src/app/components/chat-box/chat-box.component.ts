import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getDatabase, ref, onValue, push, serverTimestamp } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router'; // pour obtenir les paramètres de la route

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked {
  @Input() chatType: 'private' | 'channel' = 'private';
  @Input() targetId!: string;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: any[] = [];
  newMessage = '';
  currentUserId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const currentUserId = 'current_user_uid'; // Remplace par l'ID de l'utilisateur connecté

    // Récupère l'ID du canal ou de l'utilisateur (selon la route)
    this.route.params.subscribe(params => {
      if (params['uid']) {
        // Si l'ID cible est un utilisateur, c'est une discussion privée
        this.targetId = params['uid'];
        this.chatType = 'private';
      } else if (params['cid']) {
        // Si l'ID cible est un canal public, c'est un canal
        this.targetId = params['cid'];
        this.chatType = 'channel';
      }

      // Charger les messages du canal public ou de la conversation privée
      const db = getDatabase();
      const path = this.chatType === 'private'
        ? `privateChats/${this.getPrivateChatId(currentUserId, this.targetId)}/messages`
        : `publicChannels/${this.targetId}/messages`;

      const messagesRef = ref(db, path);

      onValue(messagesRef, snapshot => {
        const data = snapshot.val();
        this.messages = data
          ? Object.values(data).sort((a: any, b: any) => a.timestamp - b.timestamp)
          : [];
      });
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const db = getDatabase();
    const currentUserId = 'current_user_uid'; // Remplace par l'ID de l'utilisateur connecté
    const path = this.chatType === 'private'
      ? `privateChats/${this.getPrivateChatId(currentUserId, this.targetId)}/messages`
      : `publicChannels/${this.targetId}/messages`;

    const msgRef = ref(db, path);
    push(msgRef, {
      from: currentUserId,
      text: this.newMessage,
      timestamp: serverTimestamp()
    });

    this.newMessage = '';
  }

  private getPrivateChatId(uid1: string, uid2: string): string {
    return [uid1, uid2].sort().join('_');
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }, 100);
    }
  }
}
