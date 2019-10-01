import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludDentalPatientComponent } from './salud-dental-patient.component';

describe('SaludDentalPatientComponent', () => {
  let component: SaludDentalPatientComponent;
  let fixture: ComponentFixture<SaludDentalPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaludDentalPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludDentalPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
