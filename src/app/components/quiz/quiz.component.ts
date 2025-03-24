import { Component, OnInit } from '@angular/core';
import { ApiService, ApiResponse } from '../../services/api.service';
import { NgIf, NgFor } from '@angular/common';


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
  imports: [NgIf, NgFor]
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
      this.loadQuestions();
  }

  loadQuestions(): void {
      this.apiService.getQuestions().subscribe({
          next: (data: ApiResponse) => {
              this.questions = data.results;
              console.log('Questions récupérées :', this.questions);
          },
          error: (error) => {
              this.errorMessage = 'Erreur lors du chargement des questions.';
              console.error('Erreur API :', error);
          }
      });
  }

  decodeText(text: string): string {
      return decodeHtml(text);
  }
}