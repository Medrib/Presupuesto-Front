import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoResumenComponent } from './nuevo-resumen.component';

describe('NuevoResumenComponent', () => {
  let component: NuevoResumenComponent;
  let fixture: ComponentFixture<NuevoResumenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoResumenComponent]
    });
    fixture = TestBed.createComponent(NuevoResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
