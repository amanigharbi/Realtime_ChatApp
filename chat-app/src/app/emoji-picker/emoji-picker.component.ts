import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emoji-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss']
})
export class EmojiPickerComponent {
  emojis: string[] = ['😀', '😂', '😍', '😭', '😡', '👍', '🔥', '💯'];

  @Output() emojiSelected = new EventEmitter<string>();

  selectEmoji(emoji: string) {
    this.emojiSelected.emit(emoji);
  }
}
