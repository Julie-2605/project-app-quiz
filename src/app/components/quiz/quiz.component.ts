import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { AnswerButtonComponent } from '../templates/button/button.component';
import { HeroComponent } from '../templates/hero/hero.component';
import { ApiResponse } from '../../models/api';

function decodeHtml(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value; // Fonction utilitaire pour décoder les entités HTML.
}

@Component({
  standalone: true, // Composant autonome pouvant être utilisé sans inclusion dans un module Angular.
  selector: 'app-quiz', // Sélecteur HTML pour intégrer ce composant dans une vue.
  templateUrl: './quiz.component.html', // Chemin vers la structure visuelle du composant.
  styleUrls: ['./quiz.component.css'], // Chemin vers les styles CSS associés.
  imports: [NgIf, NgFor, AnswerButtonComponent, HeroComponent] // Dépendances nécessaires : directives Angular et composants externes.
})
export class QuizComponent implements OnInit {
  questions: any[] = []; // Liste des questions du quiz.
  errorMessage: string | null = null; // Message d'erreur en cas de problème avec l'API.
  currentQuestionIndex: number = 0; // Index de la question actuellement affichée.
  selectedAnswerIndex: number | null = null; // Index de la réponse sélectionnée par l'utilisateur.
  correctAnswersCount: number = 0; // Nombre de réponses correctes données par l'utilisateur.
  isAnswered: boolean = false; // Indique si une réponse a été donnée pour la question actuelle.
  shuffledAnswers: string[] = []; // Réponses mélangées pour la question actuelle.

  constructor(private router: Router, private apiService: ApiService) {} 
  // Injection des services Router pour la navigation et ApiService pour récupérer les données du quiz.

  ngOnInit(): void {
    this.loadQuestions(); // Charge les questions au démarrage du composant.
  }

  loadQuestions(): void {
    this.apiService.getQuestions().subscribe({
      next: (data: ApiResponse) => {
        console.log("Données reçues :", data);
        this.questions = data.results; // Récupère les questions depuis l'API.
        if (this.questions.length > 0) {
          this.shuffleAnswers(); // Mélange les réponses de la première question si des données sont disponibles.
        } else {
          this.errorMessage = "Aucune question trouvée."; // Message d'erreur si aucune question n'est disponible.
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des questions.'; // Message d'erreur en cas de problème avec l'API.
        console.error('Erreur API :', error);
      }
    });
  }

  shuffleAnswers(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
      .sort(() => Math.random() - 0.5); // Mélange aléatoire des réponses pour éviter un ordre prévisible.
  }

  decodeText(text: string): string {
    return decodeHtml(text); // Décodage des entités HTML dans les textes des questions/réponses.
  }

  selectAnswer(index: number, answer: string): void {
    if (this.isAnswered) return; // Empêche toute interaction après avoir répondu à une question.

    this.selectedAnswerIndex = index;
    this.isAnswered = true;

    if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
      this.correctAnswersCount++; // Incrémente le compteur si la réponse est correcte.
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex + 1 >= this.questions.length) {
      this.router.navigate(['/results']); // Redirige vers la page des résultats si toutes les questions ont été répondues.
    } else {
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.selectedAnswerIndex = null;
      this.shuffleAnswers(); // Prépare les réponses mélangées pour la prochaine question.
    }
  }
}
