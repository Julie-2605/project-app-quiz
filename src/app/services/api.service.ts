import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../models/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly BASE_URL = "https://opentdb.com/api.php";

  constructor(private http: HttpClient) {}

  setConfig(config: any) {
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

    const token = localStorage.getItem('quizToken');
    if (token) {
      apiURL += `&token=${token}`;
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

  fetchToken(): void {
    this.http.get<{ token: string }>('https://opentdb.com/api_token.php?command=request').subscribe({
      next: (response) => {
        localStorage.setItem('quizToken', response.token);
        console.log("Token récupéré :", response.token); // Ajout du log
      },
      error: (error) => {
        console.error("Erreur lors de la récupération du token :", error);
      }
    });
  }

  resetToken(): void {
    const token = localStorage.getItem('quizToken');
    if (token) {
      this.http.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`).subscribe({
        next: () => {
          console.log("Token réinitialisé avec succès.");
        },
        error: (error) => {
          console.error("Erreur lors de la réinitialisation du token :", error);
        }
      });
    }
  }
}
