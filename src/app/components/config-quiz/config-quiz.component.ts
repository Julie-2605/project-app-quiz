import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroComponent } from '../templates/hero/hero.component';

@Component({
  standalone: true,
  selector: 'app-config-quiz',
  imports: [HeroComponent, FormsModule],
  templateUrl: './config-quiz.component.html',
  styleUrl: './config-quiz.component.css'
})
export class ConfigQuizComponent {
  constructor(private router : Router) {

  }
  onSubmit (form: NgForm) {
      if (form.valid) {
        localStorage.setItem('quizConfig', JSON.stringify(form.value));
        this.router.navigate(['/quiz']);
    }
  }
}
