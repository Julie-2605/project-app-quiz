import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HeroComponent } from '../templates/hero/hero.component';

@Component({
  standalone: true,
  selector: 'app-authentificate',
  imports: [HeroComponent, FormsModule],
  templateUrl: './authentificate.component.html',
  styleUrl: './authentificate.component.css'
})
export class AuthentificateComponent {
  onSubmit (form: NgForm) {
    if (form.valid) {
      console.log(form.value);
    }
  }
}