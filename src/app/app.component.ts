import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true, // Composant autonome pouvant être utilisé sans inclusion dans un module Angular.
  selector: 'app-root', // Sélecteur HTML pour intégrer ce composant racine dans une vue.
  imports: [RouterOutlet, ReactiveFormsModule], 
  // `RouterOutlet` permet d'afficher les composants liés aux routes définies.
  // `ReactiveFormsModule` est importé pour permettre l'utilisation des formulaires réactifs dans l'application.
  templateUrl: './app.component.html', // Chemin vers la structure visuelle du composant racine.
  styleUrls: ['./app.component.css'] // Chemin vers les styles CSS associés au composant racine.
})
export class AppComponent {
  title = 'project-app-quiz'; // Titre de l'application, utilisé pour identifier ou personnaliser le projet.
}
