import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultsComponent } from './components/results/results.component';
import { AuthentificateComponent } from './components/authentificate/authentificate.component';
import { ConfigQuizComponent } from './components/config-quiz/config-quiz.component';
import { QuizComponent } from './components/quiz/quiz.component';

// Définition des routes de l'application.
export const routes: Routes = [
    { path: '', component: AuthentificateComponent }, // Route par défaut (page d'accueil).
    { path: 'authentificate', component: AuthentificateComponent }, // Page d'authentification.
    { path: 'config-quiz', component: ConfigQuizComponent }, // Page de configuration du quiz.
    { path: 'quiz', component: QuizComponent }, // Page principale du quiz.
    { path: 'results', component: ResultsComponent }, // Page des résultats.
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })], 
    // Importation du module de routage avec une stratégie de routage utilisant des hash (#) dans les URL.
    exports: [RouterModule] 
    // Exporte le `RouterModule` pour qu'il soit disponible dans l'application.
})
export class AppRoutingModule {}
