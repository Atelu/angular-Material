import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFindingsComponent } from './exam-findings.component';

describe('ExamFindingsComponent', () => {
  let component: ExamFindingsComponent;
  let fixture: ComponentFixture<ExamFindingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamFindingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
