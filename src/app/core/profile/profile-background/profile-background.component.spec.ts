import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBackgroundComponent } from './profile-background.component';

describe('ProfileBackgroundComponent', () => {
  let component: ProfileBackgroundComponent;
  let fixture: ComponentFixture<ProfileBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileBackgroundComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
