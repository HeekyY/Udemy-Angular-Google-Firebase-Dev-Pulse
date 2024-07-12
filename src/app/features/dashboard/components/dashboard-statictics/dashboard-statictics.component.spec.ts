import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStaticticsComponent } from './dashboard-statictics.component';

describe('DashboardStaticticsComponent', () => {
  let component: DashboardStaticticsComponent;
  let fixture: ComponentFixture<DashboardStaticticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStaticticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStaticticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
