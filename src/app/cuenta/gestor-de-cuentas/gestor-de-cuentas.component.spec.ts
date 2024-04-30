import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeCuentasComponent } from './gestor-de-cuentas.component';

describe('GestorDeCuentasComponent', () => {
  let component: GestorDeCuentasComponent;
  let fixture: ComponentFixture<GestorDeCuentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorDeCuentasComponent]
    });
    fixture = TestBed.createComponent(GestorDeCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
