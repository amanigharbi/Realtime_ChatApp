import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// Removed AngularFireModule as it is no longer exported
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      AngularFireDatabaseModule
      // Removed from imports and added to providers
      ng generate component auth/login
      ng generate component auth/register
      ng generate component chat/chat-room
      ng generate component chat/chat-message
      ng generate component chat/chat-input
          ],
    providers: [
      provideAuth(() => getAuth()),
      provideFirebaseApp(() => initializeApp(environment.firebase))
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {}