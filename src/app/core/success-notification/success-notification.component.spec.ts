import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessNotificationComponent } from './success-notification.component';

describe('SuccessNotificationComponent', () => {
  let component: SuccessNotificationComponent;
  let fixture: ComponentFixture<SuccessNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessNotificationComponent]
    });
    fixture = TestBed.createComponent(SuccessNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
