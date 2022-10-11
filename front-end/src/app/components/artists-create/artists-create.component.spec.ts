import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsCreateComponent } from './artists-create.component';

describe('ArtistsCreateComponent', () => {
  let component: ArtistsCreateComponent;
  let fixture: ComponentFixture<ArtistsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
