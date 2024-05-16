import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaclearComponent } from './nuevaclear.component';

describe('NuevaclearComponent', () => {
  let component: NuevaclearComponent;
  let fixture: ComponentFixture<NuevaclearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaclearComponent]
    });
    fixture = TestBed.createComponent(NuevaclearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
