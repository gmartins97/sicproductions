import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCatalogueComponent } from './client-catalogue.component';

describe('ClientCatalogueComponent', () => {
  let component: ClientCatalogueComponent;
  let fixture: ComponentFixture<ClientCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
