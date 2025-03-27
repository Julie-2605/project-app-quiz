import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroComponent } from '../templates/hero/hero.component';

@Component({
  standalone: true,
  selector: 'app-authentificate',
  imports: [HeroComponent, FormsModule],
  templateUrl: './authentificate.component.html',
  styleUrl: './authentificate.component.css'
})
export class AuthentificateComponent {
  constructor(private router: Router) {
    
  }

  onSubmit (form: NgForm) {
    if (form.valid) {
      localStorage.setItem('formData', JSON.stringify(form.value));
      console.log('Données enregistrées : ', form.value);
    
      this.router.navigate(['/config-quiz']);
    }
  }
}