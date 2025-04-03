# Quiz Application using Open Trivia DB API

## Présentation

Bienvenue dans cette application de quiz basée sur l'API **Open Trivia DB** ! Ce projet permet de jouer à un quiz avec des questions récupérées directement depuis l'API d'Open Trivia. L'application propose une interface simple et dynamique pour interagir avec les questions et obtenir un score à la fin du quiz.

**Nom** : [Nom]  
**Prénom** : [Prénom]  

---

## Fonctionnalités

### 1. **Configuration du Quiz**
Avant de commencer le quiz, vous pouvez configurer plusieurs aspects du quiz :

- **Nombre de questions** : Choisissez entre 1 et 50 questions.
- **Catégorie** : Sélectionnez une catégorie de quiz parmi celles proposées, DB (ex : Science, Histoire, etc.).
- **Difficulté** : Choisissez le niveau de difficulté des questions, avec trois niveaux disponibles :
  - **Facile** (Easy)
  - **Moyenne** (Medium)
  - **Difficile** (Hard)
- **Type de réponses** : Choisissez le type de réponses à afficher :
  - **Choix multiple** (Multiple Choice)
  - **Vrai/Faux** (True/False)
  - **Toutes catégories** (Any)

Ces paramètres permettent d’adapter le quiz selon vos préférences et le rendre plus amusant ou plus difficile en fonction de votre niveau de connaissance.

---

### 2. **Le Quiz**
Une fois la configuration du quiz effectuée, le jeu commence ! Les questions sont affichées une par une et vous devez choisir la bonne réponse parmi les options proposées. Le type de réponse (choix multiples, vrai/faux) est déterminé par les paramètres de configuration.

---

### 3. **Résultats du Quiz**
À la fin du quiz, un résumé des résultats est affiché :
- **Votre score** : Le nombre de bonnes réponses obtenues.
- **Détails des réponses** : Vous pouvez voir si chaque réponse était correcte ou incorrecte.

---

## Technologies Utilisées

- **Frontend** : Angular (avec le routing pour naviguer entre les pages)
- **API** : Open Trivia DB (pour récupérer les questions de quiz)
- **Gestion des tokens** : Le token est utilisé pour éviter la répétition des mêmes questions lors de plusieurs sessions.
  
---

## Comment démarrer ?

### 1. **Prérequis**

Assurez-vous d’avoir Node.js et Angular CLI installés. Vous pouvez les télécharger ici :
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

### 2. **Installation**

Clonez ce projet sur votre machine locale :

```bash
git clone https://github.com/votre-utilisateur/quiz-application.git
cd quiz-application
npm install
``` 

### 2. **Exécution du projet**

```bash
ng serve
``` 