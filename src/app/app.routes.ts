import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultsComponent } from './components/results/results.component';
import { AuthentificateComponent } from './components/authentificate/authentificate.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
    {path: '', component: AuthentificateComponent},
    {path: 'authentificate', component: AuthentificateComponent},
    {path: 'quiz', component: QuizComponent},
    {path: 'result', component: ResultsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }