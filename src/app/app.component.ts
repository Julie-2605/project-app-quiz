import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './components/quiz/quiz.component';
import { AuthentificateComponent } from './components/authentificate/authentificate.component';
import { ResultsComponent } from './components/results/results.component';
import { HeroComponent } from './components/templates/hero/hero.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-app-quiz';
}
