import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsShowerStatisticComponent } from './news-shower-statistic.component';

describe('NewsShowerStatisticComponent', () => {
  let component: NewsShowerStatisticComponent;
  let fixture: ComponentFixture<NewsShowerStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsShowerStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsShowerStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
