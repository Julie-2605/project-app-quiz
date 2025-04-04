import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../models/api';

@Injectable({ providedIn: 'root' }) // Fournit ce service à l'ensemble de l'application Angular.
export class ApiService {
  private readonly BASE_URL = "https://opentdb.com/api.php"; // URL de base pour l'API Open Trivia Database.

  constructor(private http: HttpClient) {} // Injection du service HttpClient pour effectuer des requêtes HTTP.

  setConfig(config: any) {
    let apiURL = `${this.BASE_URL}?amount=${config['nbr-questions']}`;
    
    // Ajout de paramètres dynamiques à l'URL en fonction des choix de configuration.
    if (config.category !== 'any') {
      apiURL += `&category=${config.category}`;
    }
    if (config.difficulty !== 'any') {
      apiURL += `&difficulty=${config.difficulty}`;
    }
    if (config.type !== 'any') {
      apiURL += `&type=${config.type}`;
    }

    // Ajout du token à l'URL si disponible dans le stockage local.
    const token = localStorage.getItem('quizToken');
    if (token) {
      apiURL += `&token=${token}`;
    }

    localStorage.setItem('apiURL', apiURL); // Stocke l'URL configurée pour les futures requêtes.
  }

  getQuestions(): Observable<ApiResponse> {
    const url = localStorage.getItem('apiURL'); // Récupère l'URL configurée depuis le stockage local.
    if (!url) {
      return throwError(() => new Error('URL non configurée.')); // Renvoie une erreur si l'URL n'est pas définie.
    }

    return this.http.get<ApiResponse>(url).pipe(
      catchError(this.handleError) // Gère les erreurs via la méthode privée `handleError`.
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => 
      new Error(`Erreur API : ${error.status} - ${error.message}`) // Formate un message d'erreur détaillé.
    );
  }

  fetchToken(): void {
    // Récupère un nouveau token depuis l'API et le stocke dans le stockage local.
    this.http.get<{ token: string }>('https://opentdb.com/api_token.php?command=request').subscribe({
      next: (response) => {
        localStorage.setItem('quizToken', response.token);
      },
      error: (error) => {
        console.error("Erreur lors de la récupération du token :", error); // Log en cas d'erreur.
      }
    });
  }

  resetToken(): void {
    const token = localStorage.getItem('quizToken'); // Récupère le token depuis le stockage local.
    if (token) {
      this.http.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`).subscribe({
        next: () => {
          console.log("Token réinitialisé avec succès."); // Log de confirmation après réinitialisation.
        },
        error: (error) => {
          console.error("Erreur lors de la réinitialisation du token :", error); // Log en cas d'erreur.
        }
      });
    }
  }
}
