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
  constructor(private router: Router, private apiService: ApiService) {} 
  // Injection des services Router pour la navigation et ApiService pour gérer la configuration via une API.

  onSubmit(form: NgForm) {
    if (form.valid) {
      const config = form.value; // Récupère les données du formulaire.

      console.log("Configuration du quiz : ", config); // Affiche la configuration dans la console pour vérification.

      this.apiService.setConfig(config); // Envoie la configuration au service API.

      this.router.navigate(['/quiz']); // Redirige l'utilisateur vers la page du quiz après soumission.
    }
  }
}
