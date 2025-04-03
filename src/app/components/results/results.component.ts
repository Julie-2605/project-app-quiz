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
  formData: any = {};
  subtitleHero: string = '';
  results: number = 0;
  message: string = "";
  totalQuestions: number = 1;

  ngOnInit() {
    const formData = localStorage.getItem('formData');
    if(formData) {
      this.formData = JSON.parse(formData);
      this.subtitleHero = `${this.formData.prenom} ${this.formData.nom}`;
    }

    const quizScore = localStorage.getItem('quizScore');
    if (quizScore) {
      this.results = JSON.parse(quizScore);
    }

    const storageTotalQuestions = localStorage.getItem('totalQuestions');
    if (storageTotalQuestions) {
      this.totalQuestions = JSON.parse(storageTotalQuestions);
    }

    console.log(`Total de questions : ${this.totalQuestions}`);

    this.results = this.ratingOn20(this.totalQuestions);

    console.log(`Résultats : ${this.results}`);

    this.loadScoreMessages();
  }

  async loadScoreMessages() {
    const response = await fetch('/assets/resultSentence.json');
    const data = await response.json();

    this.message = this.getRandomMessage(data.scores, this.results);
  }
  
  getRandomMessage(resultSentence : { [key: string]: string[] }, score : number): string {
    //Match the score in the JSON
    const scoreKeys = Object.keys(resultSentence).map(key => parseInt(key));
    
    let scoreKey = 0;
    for (let key of scoreKeys) {
      if(key <= score) {
        scoreKey = key;
      }
    }

    const messages = resultSentence[scoreKey];
    const random = Math.floor(Math.random() * messages.length);
    return messages[random];
  }

  ratingOn20(totalQuestions : number): number {
    let score =  (this.results / totalQuestions) * 20;
    return parseFloat(score.toFixed(1)) ; 
  }
}
