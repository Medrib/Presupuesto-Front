import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingSearchComponent } from './order-tracking-search.component';

describe('OrderTrackingSearchComponent', () => {
  let component: OrderTrackingSearchComponent;
  let fixture: ComponentFixture<OrderTrackingSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTrackingSearchComponent]
    });
    fixture = TestBed.createComponent(OrderTrackingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
