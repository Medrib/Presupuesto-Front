import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeStockComponent } from './gestion-de-stock.component';

describe('GestionDeStockComponent', () => {
  let component: GestionDeStockComponent;
  let fixture: ComponentFixture<GestionDeStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDeStockComponent]
    });
    fixture = TestBed.createComponent(GestionDeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
