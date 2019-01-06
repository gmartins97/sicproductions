import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEncomendaComponent } from './edit-encomenda.component';

describe('EditEncomendaComponent', () => {
  let component: EditEncomendaComponent;
  let fixture: ComponentFixture<EditEncomendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEncomendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEncomendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
