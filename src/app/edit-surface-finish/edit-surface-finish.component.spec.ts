import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurfaceFinishComponent } from './edit-surface-finish.component';

describe('EditSurfaceFinishComponent', () => {
  let component: EditSurfaceFinishComponent;
  let fixture: ComponentFixture<EditSurfaceFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSurfaceFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSurfaceFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
