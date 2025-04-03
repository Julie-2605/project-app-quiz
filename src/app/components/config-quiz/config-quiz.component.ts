import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroComponent } from '../templates/hero/hero.component';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-config-quiz',
  imports: [HeroComponent, FormsModule],
  templateUrl: './config-quiz.component.html',
  styleUrl: './config-quiz.component.css'
})
export class ConfigQuizComponent {
  constructor(private router : Router, private apiService : ApiService) {

  }
  onSubmit (form: NgForm) {
    if (form.valid) {
      const config = form.value;

      console.log("Configuration du quiz : ", config);

      this.apiService.setConfig(config);

      this.router.navigate(['/quiz']);
    }
  }
}
