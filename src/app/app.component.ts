import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { AuthentificateComponent } from './components/authentificate/authentificate.component';
import { ResultsComponent } from './components/results/results.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet,QuizComponent,AuthentificateComponent,ResultsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-app-quiz';
}
