import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCataloguesComponent } from './client-catalogues.component';

describe('ClientCataloguesComponent', () => {
  let component: ClientCataloguesComponent;
  let fixture: ComponentFixture<ClientCataloguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCataloguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
