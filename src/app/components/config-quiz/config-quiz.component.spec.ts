import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigQuizComponent } from './config-quiz.component';

describe('ConfigQuizComponent', () => {
  let component: ConfigQuizComponent;
  let fixture: ComponentFixture<ConfigQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
