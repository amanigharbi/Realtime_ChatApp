import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue, push, set, serverTimestamp } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  messages: any[] = [];
  inputText: string = '';
  chatType: 'private' | 'channel' = 'private';
  targetId: string = '';
  currentUserId: string = ''; // à récupérer depuis AuthService

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // exemple hardcodé, à remplacer par l'auth réelle
    this.currentUserId = 'user1';

    this.route.params.subscribe(params => {
      const db = getDatabase();
      this.chatType = this.route.snapshot.url[0].path as 'private' | 'channel';
      this.targetId = params['uid'] || params['cid'];

      let chatRef;

      if (this.chatType === 'private') {
        const chatId = this.getPrivateChatId(this.currentUserId, this.targetId);
        chatRef = ref(db, `privateChats/${chatId}/messages`);
      } else {
        chatRef = ref(db, `publicChannels/${this.targetId}/messages`);
      }

      onValue(chatRef, snapshot => {
        const data = snapshot.val() || {};
        this.messages = Object.values(data).sort((a: any, b: any) => a.timestamp - b.timestamp);
      });
    });
  }

  getPrivateChatId(uid1: string, uid2: string): string {
    return [uid1, uid2].sort().join('_');
  }

  sendMessage() {
    if (!this.inputText.trim()) return;

    const db = getDatabase();
    const chatId = this.chatType === 'private'
      ? `privateChats/${this.getPrivateChatId(this.currentUserId, this.targetId)}/messages`
      : `publicChannels/${this.targetId}/messages`;

    const msgRef = push(ref(db, chatId));
    set(msgRef, {
      from: this.currentUserId,
      text: this.inputText,
      timestamp: serverTimestamp()
    });

    this.inputText = '';
  }
}
