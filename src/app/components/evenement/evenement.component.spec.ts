import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementComponent } from './evenement.component';

describe('EventComponent', () => {
  let component: EvenementComponent;
  let fixture: ComponentFixture<EvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
