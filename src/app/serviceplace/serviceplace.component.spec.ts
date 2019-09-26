import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceplaceComponent } from './serviceplace.component';

describe('ServiceplaceComponent', () => {
  let component: ServiceplaceComponent;
  let fixture: ComponentFixture<ServiceplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
