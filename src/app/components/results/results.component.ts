import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../templates/hero/hero.component';

@Component({
  standalone: true, // Composant autonome pouvant être utilisé sans inclusion dans un module Angular.
  selector: 'app-results', // Sélecteur HTML pour intégrer ce composant dans une vue.
  imports: [HeroComponent], // Dépendance au composant Hero utilisé dans la vue.
  templateUrl: './results.component.html', // Chemin vers la structure visuelle du composant.
  styleUrl: './results.component.css' // Chemin vers les styles CSS associés.
})
export class ResultsComponent implements OnInit {
  formData: any = {}; // Objet contenant les données du formulaire récupérées depuis le stockage local.
  subtitleHero: string = ''; // Sous-titre affiché dans le composant Hero.

  ngOnInit() {
    const data = localStorage.getItem('formData'); // Récupère les données stockées localement.
    if (data) {
      this.formData = JSON.parse(data); // Parse les données JSON pour les convertir en objet JavaScript.
      this.subtitleHero = `${this.formData.prenom} ${this.formData.nom}`; 
      // Construit le sous-titre avec le prénom et le nom récupérés depuis les données du formulaire.
    }
  }
}
