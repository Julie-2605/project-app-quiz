import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../templates/hero/hero.component';

@Component({
  standalone: true,
  selector: 'app-results',
  imports: [HeroComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  formData: any = {};
  subtitleHero: string = '';

  ngOnInit() {
    const data = localStorage.getItem('formData');
    if(data) {
      this.formData = JSON.parse(data);
      this.subtitleHero = `${this.formData.prenom} ${this.formData.nom}`;
    }
  }
}
