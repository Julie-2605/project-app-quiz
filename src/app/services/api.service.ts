import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

// Interface pour la réponse (adaptez selon l'API)
export interface ApiResponse {
  response_code: number;
  results: QuizQuestion[];
}

export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly BASE_URL = "https://opentdb.com/api.php";

  constructor(private http: HttpClient) {}

  setConfig(config : any) {
    let apiURL = `${this.BASE_URL}?amount=${config['nbr-questions']}`;

    if (config.category !== 'any') {
      apiURL += `&category=${config.category}`;
    }

    if (config.difficulty !== 'any') {
      apiURL += `&difficulty=${config.difficulty}`;
    }

    if (config.type !== 'any') {
      apiURL += `&type=${config.type}`;
    }

    localStorage.setItem('apiURL', apiURL);
  }

  getQuestions(): Observable<ApiResponse> {
    const url = localStorage.getItem('apiURL');
    if (!url) {
      return throwError(() => new Error('URL non configurée.'));
    }

    return this.http.get<ApiResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => 
      new Error(`Erreur API : ${error.status} - ${error.message}`)
    );
  }
}
