import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AnswerButtonComponent } from '../templates/button/button.component';
import { HeroComponent } from '../templates/hero/hero.component';
import { ApiResponse } from '../../models/api';

function decodeHtml(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

@Component({
  standalone: true,
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule, FormsModule, AnswerButtonComponent, HeroComponent], // ✅ Ajout de CommonModule et FormsModule correctement
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  errorMessage: string | null = null;
  currentQuestionIndex: number = 0;
  selectedAnswerIndex: number | null = null;
  selectedAnswers: string[] = []; // Stocke les réponses sélectionnées pour les questions à choix multiples
  correctAnswersCount: number = 0;
  isAnswered: boolean = false;
  shuffledAnswers: string[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.apiService.getQuestions().subscribe({
      next: (data: ApiResponse) => {
        this.questions = data.results;
        localStorage.setItem('totalQuestions', data.results.length.toString());
        if (this.questions.length > 0) {
          this.shuffleAnswers();
        } else {
          this.errorMessage = "Aucune question trouvée.";
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des questions.';
        console.error('Erreur API :', error);
      }
    });
  }

  shuffleAnswers(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
      .sort(() => Math.random() - 0.5);
  }

  decodeText(text: string): string {
    return decodeHtml(text);
  }

  isMultipleChoice(): boolean {
    return this.questions[this.currentQuestionIndex]?.type === 'multiple';
  }

  selectAnswer(index: number, answer: string): void {
    if (this.isAnswered || this.isMultipleChoice()) return;
    this.selectedAnswerIndex = index;
    this.isAnswered = true;

    if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
      this.correctAnswersCount++;
    }
  }

  updateMultipleChoiceSelection(answer: string): void {
    if (this.selectedAnswers.includes(answer)) {
      this.selectedAnswers = this.selectedAnswers.filter(a => a !== answer);
    } else {
      this.selectedAnswers.push(answer);
    }
    this.isAnswered = this.selectedAnswers.length > 0;
  }

  nextQuestion(): void {
    if (this.isMultipleChoice()) {
      const correctAnswers = this.questions[this.currentQuestionIndex].correct_answer;
      const selectedAnswersSorted = [...this.selectedAnswers].sort();
      const correctAnswersSorted = Array.isArray(correctAnswers) ? [...correctAnswers].sort() : [correctAnswers];

      if (JSON.stringify(selectedAnswersSorted) === JSON.stringify(correctAnswersSorted)) {
        this.correctAnswersCount++;
      }
    }

    if (this.currentQuestionIndex + 1 >= this.questions.length) {
      localStorage.setItem('quizScore', JSON.stringify(this.correctAnswersCount));
      this.router.navigate(['/results']);
    } else {
      this.currentQuestionIndex++;
      this.isAnswered = false;
      this.selectedAnswerIndex = null;
      this.selectedAnswers = [];
      this.shuffleAnswers();
    }
  }
}
