import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingListComponent } from './order-tracking-list.component';

describe('OrderTrackingListComponent', () => {
  let component: OrderTrackingListComponent;
  let fixture: ComponentFixture<OrderTrackingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTrackingListComponent]
    });
    fixture = TestBed.createComponent(OrderTrackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
