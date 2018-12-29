import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaterialFinishComponent } from './edit-material-finish.component';

describe('EditMaterialFinishComponent', () => {
  let component: EditMaterialFinishComponent;
  let fixture: ComponentFixture<EditMaterialFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMaterialFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaterialFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
