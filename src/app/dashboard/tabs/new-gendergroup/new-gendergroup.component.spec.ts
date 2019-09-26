import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGendergroupComponent } from './new-gendergroup.component';

describe('NewGendergroupComponent', () => {
  let component: NewGendergroupComponent;
  let fixture: ComponentFixture<NewGendergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGendergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGendergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
