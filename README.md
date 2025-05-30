﻿# Chat Application avec Firebase et Angular

## Description

Cette application de chat utilise Firebase pour la gestion des utilisateurs et des messages. Elle est construite avec Angular et permet de créer des discussions privées ou des canaux publics.

## Fonctionnalités

- Envoi et réception de messages en temps réel
- Discussions privées et publiques
- Gestion des utilisateurs via Firebase Auth
- Interface de chat avec des bulles de conversation, avatars et horodatage

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Node.js** et **npm** : [Téléchargez Node.js ici](https://nodejs.org/)
- **Firebase** : Vous aurez besoin d'un projet Firebase pour utiliser les services de base de données en temps réel et l'authentification.

## Installation

### Étape 1 : Clonez le projet

Clonez ce dépôt dans un répertoire local sur votre machine :

```bash
git clone https://github.com/votre-utilisateur/chat-app.git
 ```

### Étape 2 : Installez les dépendances

Naviguez vers le répertoire du projet et installez les dépendances nécessaires :
```bash 
- cd chat-app
- npm install
```

### Étape 3 : Configurez Firebase

1. Créez un projet sur Firebase Console.

2. Activez la base de données en temps réel et l'authentification.

3. Téléchargez le fichier google-services.json et placez-le dans le répertoire racine du projet.

4. Copiez les informations de votre projet Firebase (API key, authDomain, databaseURL, etc.) et ajoutez-les dans votre fichier environment.ts :
   

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    databaseURL: "VOTRE_DATABASE_URL",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID"
  }
};
```
### Étape 4 : Démarrez l'application

Une fois la configuration terminée, vous pouvez démarrer le serveur de développement avec la commande suivante :

```bash
ng serve
```
Cela lancera l'application localement à l'adresse ```http://localhost:4200```.

### Étape 5 : Tester l'application
1. **Connexion** : Une fois l'application lancée, l'utilisateur sera invité à se connecter via Firebase Authentication.

2. **Chat privé ou public** : L'utilisateur peut choisir entre un chat privé (un-à-un) ou un canal public.

3. **Envoyer des messages** : Les messages sont envoyés en temps réel à Firebase et sont instantanément reçus par les autres utilisateurs dans la conversation.

## Structure de la base de données Firebase
La base de données Firebase Realtime est structurée comme suit :

- **privateChats** : Contient les chats privés entre deux utilisateurs.

  - ```privateChats/{id_utilisateur_1}_{id_utilisateur_2}/messages``` : Messages entre 
     ```id_utilisateur_1``` et ```id_utilisateur_2```.

- **publicChannels** : Contient les canaux publics où les utilisateurs peuvent participer.

  - ```publicChannels/{id_du_canal}/messages``` : Messages dans un canal public.

## Données des utilisateurs

Le nœud users dans Firebase Realtime Database stocke les profils des utilisateurs, y compris :

- **displayName** : Nom d'affichage de l'utilisateur.

- **avatar** : URL de l'avatar de l'utilisateur.

## Contribuer

1. Forkez le dépôt.

2. Créez une nouvelle branche (```git checkout -b feature/ma-feature```).

3. Apportez vos modifications et validez-les (```git commit -am 'Ajout de la nouvelle fonctionnalité'```).

4. Poussez vos changements (```git push origin feature/ma-feature```).

5. Créez une nouvelle **pull request**.
   
## Licence
Ce projet est open-source sous la licence MIT.

## N'oublie pas :
- Remplacer les liens et configurations spécifiques avec tes propres informations Firebase.

- Si tu as des fonctionnalités spécifiques à ajouter ou des détails particuliers à inclure, n'hésite pas à personnaliser ce ```README``` à ta convenance.



