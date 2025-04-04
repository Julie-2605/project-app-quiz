import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroComponent } from '../templates/hero/hero.component';

@Component({
  standalone: true, // Ce composant est autonome et peut être utilisé sans dépendre d'un module spécifique.
  selector: 'app-authentificate', // Définit le sélecteur HTML pour intégrer ce composant dans une vue.
  imports: [HeroComponent, FormsModule], // Le composant utilise le module de gestion des formulaires et un autre composant externe.
  templateUrl: './authentificate.component.html', // Chemin vers le fichier HTML qui contient la structure visuelle du composant.
  styleUrl: './authentificate.component.css' // Chemin vers le fichier CSS pour les styles du composant.
})
export class AuthentificateComponent {
  constructor(private router: Router) {} // Injection du service Router pour gérer la navigation entre les pages.

  ngOnInit(): void {
    //Nettoyage du localStorage
    localStorage.removeItem('totalQuestions');
    localStorage.removeItem('formData');
    localStorage.removeItem('quizScore');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Enregistre les données du formulaire dans le stockage local.
      localStorage.setItem('formData', JSON.stringify(form.value));
      console.log('Données enregistrées : ', form.value); // Affiche les données dans la console pour vérification.

      // Redirige l'utilisateur vers la page de configuration du quiz après une soumission valide.
      this.router.navigate(['/config-quiz']);
    }
  }
}
