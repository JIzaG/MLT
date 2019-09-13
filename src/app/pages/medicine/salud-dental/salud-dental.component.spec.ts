import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludDentalComponent } from './salud-dental.component';

describe('SaludDentalComponent', () => {
  let component: SaludDentalComponent;
  let fixture: ComponentFixture<SaludDentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaludDentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludDentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
