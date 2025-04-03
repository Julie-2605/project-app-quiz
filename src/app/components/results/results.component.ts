import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../templates/hero/hero.component';
import { ApiService } from '../../services/api.service';
import resultSentence from '../../../../public/assets/resultSentence.json';

@Component({
  standalone: true,
  selector: 'app-results',
  imports: [HeroComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
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
    return (this.results / totalQuestions) * 20;
  }
}
