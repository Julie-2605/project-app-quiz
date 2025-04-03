import { Component, OnInit } from '@angular/core';
import { ApiService, ApiResponse } from '../../services/api.service';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { AnswerButtonComponent } from '../templates/button/button.component';
import { HeroComponent } from '../templates/hero/hero.component';


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
  imports: [NgIf, NgFor, AnswerButtonComponent, HeroComponent]
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  errorMessage: string | null = null;
  currentQuestionIndex: number = 0;
  selectedAnswerIndex: number | null = null;
  correctAnswersCount: number = 0;
  isAnswered: boolean = false;
  shuffledAnswers: string[] = [];
  constructor(private router: Router, private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.apiService.getQuestions().subscribe({
      next: (data: ApiResponse) => {
        this.questions = data.results;
        this.shuffleAnswers();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des questions.';
        console.error('Erreur API :', error);
      }
    });
  }

  shuffleAnswers(): void {
    if (this.questions.length > 0) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
        .sort(() => Math.random() - 0.5);
    }
  }

  decodeText(text: string): string {
    return decodeHtml(text);
  }

  selectAnswer(index: number, answer: string): void {
    if (this.isAnswered) return;
    this.selectedAnswerIndex = index;
    this.isAnswered = true;
    if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
      this.correctAnswersCount++;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswerIndex = null;
      this.isAnswered = false;
      this.shuffleAnswers();
    } else {
      this.router.navigate(['/results'], {
        queryParams: { score: this.correctAnswersCount, total: this.questions }
      });
    }
  }
}
