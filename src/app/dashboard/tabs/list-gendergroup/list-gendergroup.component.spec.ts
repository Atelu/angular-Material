import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGendergroupComponent } from './list-gendergroup.component';

describe('ListGendergroupComponent', () => {
  let component: ListGendergroupComponent;
  let fixture: ComponentFixture<ListGendergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGendergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGendergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
