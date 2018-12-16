import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurfaceFinishComponent } from './create-surface-finish.component';

describe('CreateSurfaceFinishComponent', () => {
  let component: CreateSurfaceFinishComponent;
  let fixture: ComponentFixture<CreateSurfaceFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSurfaceFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSurfaceFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
