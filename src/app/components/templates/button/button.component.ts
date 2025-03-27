import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgClass } from '@angular/common'; // Ajout de NgClass

@Component({
  standalone: true,
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [NgIf, NgClass] // Ajout de NgClass ici
})
export class AnswerButtonComponent {
  @Input() answerText: string = '';
  @Input() isSelected: boolean = false;
  @Input() isCorrect: boolean = false; // Ajout pour gérer la couleur
  @Input() isAnswered: boolean = false;
  @Output() answerSelected = new EventEmitter<void>();

  selectAnswer(): void {
    this.answerSelected.emit();
  }
}
