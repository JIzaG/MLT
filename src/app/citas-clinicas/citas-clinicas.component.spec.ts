import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasClinicasComponent } from './citas-clinicas.component';

describe('CitasClinicasComponent', () => {
  let component: CitasClinicasComponent;
  let fixture: ComponentFixture<CitasClinicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasClinicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
