import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBlockEditComponent } from './profile-block-edit.component';

describe('ProfileBlockEditComponent', () => {
  let component: ProfileBlockEditComponent;
  let fixture: ComponentFixture<ProfileBlockEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBlockEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBlockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
