import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../templates/hero/hero.component';
import { ApiService } from '../../services/api.service';
import resultSentence from '../../../../public/assets/resultSentence.json';

@Component({
  standalone: true, // Composant autonome pouvant être utilisé sans inclusion dans un module Angular.
  selector: 'app-results', // Sélecteur HTML pour intégrer ce composant dans une vue.
  imports: [HeroComponent], // Dépendance au composant Hero utilisé dans la vue.
  templateUrl: './results.component.html', // Chemin vers la structure visuelle du composant.
  styleUrl: './results.component.css' // Chemin vers les styles CSS associés.
})
export class ResultsComponent implements OnInit {
  formData: any = {}; // Données utilisateur récupérées depuis le stockage local.
  subtitleHero: string = ''; // Sous-titre affiché dans le composant Hero (nom complet de l'utilisateur).
  results: number = 0; // Résultat du quiz (score brut ou converti sur 20).
  message: string = ""; // Message personnalisé basé sur le score.
  totalQuestions: number = 1; // Nombre total de questions dans le quiz.

  ngOnInit() {
    // Récupère les données utilisateur depuis le stockage local et met à jour `formData`.
    const formData = localStorage.getItem('formData');
    if (formData) {
      this.formData = JSON.parse(formData);
      this.subtitleHero = `${this.formData.prenom} ${this.formData.nom}`; // Construit le sous-titre avec prénom et nom.
    }

    // Récupère le score brut du quiz depuis le stockage local.
    const quizScore = localStorage.getItem('quizScore');
    if (quizScore) {
      this.results = JSON.parse(quizScore);
    }

    // Récupère le nombre total de questions du quiz depuis le stockage local.
    const storageTotalQuestions = localStorage.getItem('totalQuestions');
    if (storageTotalQuestions) {
      this.totalQuestions = JSON.parse(storageTotalQuestions);
    }

    console.log(`Total de questions : ${this.totalQuestions}`);

    // Calcule le score sur 20 à partir du score brut et du nombre total de questions.
    this.results = this.ratingOn20(this.totalQuestions);

    console.log(`Résultats : ${this.results}`);

    // Charge les messages personnalisés en fonction du score.
    this.loadScoreMessages();
  }

  async loadScoreMessages() {
    // Charge les messages depuis un fichier JSON situé dans `/assets/resultSentence.json`.
    const response = await fetch('/assets/resultSentence.json');
    const data = await response.json();

    // Sélectionne un message aléatoire basé sur le score.
    this.message = this.getRandomMessage(data.scores, this.results);
  }
  
  getRandomMessage(resultSentence: { [key: string]: string[] }, score: number): string {
    // Trouve la clé correspondant au score dans l'objet `resultSentence`.
    const scoreKeys = Object.keys(resultSentence).map(key => parseInt(key));
    
    let scoreKey = 0;
    for (let key of scoreKeys) {
      if (key <= score) {
        scoreKey = key; // Associe la clé la plus proche sans dépasser le score.
      }
    }

    // Récupère les messages associés à cette clé et en sélectionne un aléatoirement.
    const messages = resultSentence[scoreKey];
    const random = Math.floor(Math.random() * messages.length);
    return messages[random];
  }

  ratingOn20(totalQuestions: number): number {
    // Calcule le score sur une échelle de 20 points et arrondit à un chiffre après la virgule.
    let score = (this.results / totalQuestions) * 20;
    return parseFloat(score.toFixed(1));
  }
}
