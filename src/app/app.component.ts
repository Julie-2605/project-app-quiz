import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet,QuizComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-app-quiz';
}
