import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDeGastosComponent } from './categoria-de-gastos.component';

describe('CategoriaDeGastosComponent', () => {
  let component: CategoriaDeGastosComponent;
  let fixture: ComponentFixture<CategoriaDeGastosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaDeGastosComponent]
    });
    fixture = TestBed.createComponent(CategoriaDeGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
