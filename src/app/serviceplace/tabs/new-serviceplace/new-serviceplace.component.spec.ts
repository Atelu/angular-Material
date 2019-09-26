import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceplaceComponent } from './new-serviceplace.component';

describe('NewServiceplaceComponent', () => {
  let component: NewServiceplaceComponent;
  let fixture: ComponentFixture<NewServiceplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewServiceplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
