# Chat Application avec Firebase et Angular

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

```bash ``` git clone https://github.com/votre-utilisateur/chat-app.git

### Étape 2 : Installez les dépendances

Naviguez vers le répertoire du projet et installez les dépendances nécessaires :

cd chat-app
npm install

### Étape 3 : Configurez Firebase

1- Créez un projet sur Firebase Console.

Activez la base de données en temps réel et l'authentification.

Téléchargez le fichier google-services.json et placez-le dans le répertoire racine du projet.

Copiez les informations de votre projet Firebase (API key, authDomain, databaseURL, etc.) et ajoutez-les dans votre fichier environment.ts :

