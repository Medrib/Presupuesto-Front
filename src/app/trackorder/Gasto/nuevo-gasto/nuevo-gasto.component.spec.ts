import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoGastoComponent } from './nuevo-gasto.component';

describe('NuevoGastoComponent', () => {
  let component: NuevoGastoComponent;
  let fixture: ComponentFixture<NuevoGastoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoGastoComponent]
    });
    fixture = TestBed.createComponent(NuevoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
