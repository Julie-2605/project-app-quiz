import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input() titleHero: string = "";
  @Input() subtitleHero: string = "";
  @Input() mainTitleHero: string = "";
}
