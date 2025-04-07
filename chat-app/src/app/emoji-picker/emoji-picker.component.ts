import { Component, EventEmitter, Output } from '@angular/core';
import EmojiPicker from 'emoji-picker-react';

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss']
})
export class EmojiPickerComponent {
  @Output() emojiSelect = new EventEmitter<string>();

  // Removed duplicate handleEmojiClick definition

  // Removed render method and replaced with Angular-compatible template usage
  handleEmojiClick(event: any) {
    this.emojiSelect.emit(event.emoji);  // Emit the selected emoji
  }
}
