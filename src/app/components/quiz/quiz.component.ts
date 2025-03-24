import { Component, OnInit } from '@angular/core';
import { ApiService, ApiResponse } from '../../services/api.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [NgIf, NgFor] // Ajoutez NgIf et NgFor ici
})

export class QuizComponent implements OnInit {
  questions: any[] = []; // Stocker les questions récupérées
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

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
}