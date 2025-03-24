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

@Injectable({ providedIn: 'root' }) // ✅ Singleton global
export class ApiService {
  private readonly API_URL = "https://opentdb.com/api.php?amount=10"; // ✅ Privé + readonly

  constructor(private http: HttpClient) {} // ✅ Injection correcte

  getQuestions(): Observable<ApiResponse> { // ✅ Bon typage
    return this.http.get<ApiResponse>(this.API_URL).pipe(
      catchError(this.handleError) // ✅ Gestion d'erreurs
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => 
      new Error(`Erreur API : ${error.status} - ${error.message}`)
    );
  }
}
