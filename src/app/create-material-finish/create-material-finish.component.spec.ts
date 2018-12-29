import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaterialFinishComponent } from './create-material-finish.component';

describe('CreateMaterialFinishComponent', () => {
  let component: CreateMaterialFinishComponent;
  let fixture: ComponentFixture<CreateMaterialFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMaterialFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaterialFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
