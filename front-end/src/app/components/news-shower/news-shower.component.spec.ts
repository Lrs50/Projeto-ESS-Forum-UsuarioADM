import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsShowerComponent } from './news-shower.component';

describe('NewsShowerComponent', () => {
  let component: NewsShowerComponent;
  let fixture: ComponentFixture<NewsShowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsShowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
