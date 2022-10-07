import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsManagementComponent } from './artists-management.component';

describe('ArtistsManagementComponent', () => {
  let component: ArtistsManagementComponent;
  let fixture: ComponentFixture<ArtistsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
