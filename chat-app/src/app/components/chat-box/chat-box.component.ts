import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  getDatabase,
  ref,
  onValue,
  push,
  serverTimestamp
} from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth'; // Ajout de Firebase Auth

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
  currentUserId: string = ''; // ID de l'utilisateur connecté
  usersMap: { [uid: string]: any } = {}; // Liste des utilisateurs

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const auth = getAuth(); // Firebase Auth instance
    const user = auth.currentUser; // Récupère l'utilisateur connecté

    // Vérifie si un utilisateur est connecté
    if (user) {
      this.currentUserId = user.uid; // Récupère l'ID de l'utilisateur connecté
    } else {
      console.error('Aucun utilisateur connecté');
    }

    const db = getDatabase();

    // 🔁 Charger les utilisateurs
    const usersRef = ref(db, 'users');
    onValue(usersRef, snapshot => {
      const data = snapshot.val();
      this.usersMap = data || {};
      console.log('Utilisateurs chargés:', this.usersMap); // Log pour vérifier
    });

    // 🔁 Détecter si c'est un chat privé ou un canal public
    this.route.params.subscribe(params => {
      if (params['uid']) {
        this.targetId = params['uid'];
        this.chatType = 'private';
      } else if (params['cid']) {
        this.targetId = params['cid'];
        this.chatType = 'channel';
      }

      const path =
        this.chatType === 'private'
          ? `privateChats/${this.getPrivateChatId(this.currentUserId, this.targetId)}/messages`
          : `publicChannels/${this.targetId}/messages`;

      const messagesRef = ref(db, path);

      onValue(messagesRef, snapshot => {
        const data = snapshot.val();
        this.messages = data
          ? Object.values(data).sort((a: any, b: any) => a.timestamp - b.timestamp)
          : [];
        console.log('Messages chargés:', this.messages); // Log pour vérifier
      });
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const db = getDatabase();
    const path =
      this.chatType === 'private'
        ? `privateChats/${this.getPrivateChatId(this.currentUserId, this.targetId)}/messages`
        : `publicChannels/${this.targetId}/messages`;

    const msgRef = ref(db, path);
    push(msgRef, {
      from: this.currentUserId,  // ID de l'utilisateur connecté
      text: this.newMessage,      // Le texte du message
      timestamp: serverTimestamp() // L'horodatage
    });

    this.newMessage = ''; // Réinitialiser le champ du message après l'envoi
  }

  private getPrivateChatId(uid1: string, uid2: string): string {
    return [uid1, uid2].sort().join('_');
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }, 100);
    }
  }

  getUserAvatar(uid: string): string {
    return this.userAvatars[uid] || 'https://api.dicebear.com/7.x/thumbs/svg?seed=Unknown';
  }

  getSenderName(uid: string): string {
    // Vérification dans les logs du nom d'utilisateur et des utilisateurs
    console.log('Vérification de l\'ID utilisateur:', uid);
    console.log('Utilisateurs disponibles dans usersMap:', this.usersMap);

    // S'assurer que usersMap contient les utilisateurs
    const user = this.usersMap[uid];
    if (user) {
      console.log('Utilisateur trouvé:', user.displayName);
      return user.displayName;
    } else {
      console.log('Utilisateur non trouvé, affichage "Inconnu"');
      return 'Inconnu'; // Afficher "Inconnu" si l'utilisateur n'est pas trouvé
    }
  }

  userAvatars: { [uid: string]: string } = {
    'current_user_uid': 'https://api.dicebear.com/7.x/thumbs/svg?seed=Me',
    'txsLhM241LTV5Xkzn4rSEoEIxPQ2': 'https://api.dicebear.com/7.x/thumbs/svg?seed=Fox',
    'test': 'https://api.dicebear.com/7.x/thumbs/svg?seed=Cat',
    'test123': 'https://api.dicebear.com/7.x/thumbs/svg?seed=Dog',
    'user1': 'https://api.dicebear.com/7.x/thumbs/svg?seed=Monkey',
    'user2': 'https://api.dicebear.com/7.x/thumbs/svg?seed=Rabbit'
  };
}
