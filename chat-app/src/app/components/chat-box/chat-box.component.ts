import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, onValue, push, set, serverTimestamp } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { EmojiPickerComponent } from '../../emoji-picker/emoji-picker.component';  // Import du composant emoji

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule, EmojiPickerComponent],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  messages: any[] = [];
  inputText: string = '';
  chatType: 'private' | 'channel' = 'private';
  targetId: string = '';
  currentUserId: string = ''; // À récupérer depuis AuthService
  users: any = {};  // Stockage des utilisateurs et leurs noms

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Exemple hardcodé, à remplacer par l'auth réelle
    this.currentUserId = 'user1';

    const db = getDatabase();

    // Charger les utilisateurs (pour récupérer leurs noms)
    const usersRef = ref(db, 'users');
    onValue(usersRef, snapshot => {
      const data = snapshot.val();
      this.users = data;  // On stocke les noms des utilisateurs dans this.users
    });

    // Chargement des messages pour le chat (privé ou public)
    this.route.params.subscribe(params => {
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

  getUserName(userId: string): string {
    return this.users[userId]?.displayName || 'Utilisateur';  // Retourne le nom de l'utilisateur ou un fallback
  }

  getFormattedTime(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  handleEmojiSelect(emoji: string) {
    this.inputText += emoji;  // Ajoute l'emoji sélectionné au texte du message
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

    this.inputText = '';  // Réinitialisation du champ de texte
  }
}
