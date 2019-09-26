import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceplaceComponent } from './list-serviceplace.component';

describe('ListServiceplaceComponent', () => {
  let component: ListServiceplaceComponent;
  let fixture: ComponentFixture<ListServiceplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListServiceplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServiceplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
