import { Component } from '@angular/core';
import { HeroComponent } from '../templates/hero/hero.component';

@Component({
  standalone: true,
  selector: 'app-authentificate',
  imports: [HeroComponent],
  templateUrl: './authentificate.component.html',
  styleUrl: './authentificate.component.css'
})
export class AuthentificateComponent {

}
