import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatPaginator } from '@angular/material';
import { DiagnosisComponent } from '../diagnosis/diagnosis.component';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {

  exam: string;
  findings: any;
  remarks: any;
  enabled: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { exam: 'General/Constitutional', findings: '', remarks: '', enabled: true },
  { exam: 'EAR, NOSE AND THROAT(ENT)', findings: '', remarks: '', enabled: true },
  // {exam: 'CARDIOVASCULAR', findings: '', remarks: '', enabled: true},
  // {exam: 'RESPIRATORY', findings: '', remarks: '', enabled: true},
  // {exam: 'GASTROINTESTINAL', findings: '', remarks: ''},

];
@Component({
  selector: 'app-exam-findings',
  templateUrl: './exam-findings.component.html',
  styleUrls: ['./exam-findings.component.css']
})
export class ExamFindingsComponent implements OnInit {
  examFindingSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  isButtonEnable = true;
  user: any;
  displayedColumns: string[] = [
    'select',
    'exam',
    'findings',
    'remarks',

  ];

  constructor(public dialogRef: MatDialogRef<DiagnosisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selection.changed.subscribe(item => {
      this.isButtonEnable = this.selection.selected.length === 0;
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  applyFilter(filterValue) {
    this.examFindingSource.filter = filterValue.trim().toLowerCase();

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.examFindingSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isButtonEnable = true;
      this.examFindingSource.data.forEach(row => {
        row.enabled = !row.enabled;
      });
    } else {

      this.examFindingSource.data.forEach(row => this.selection.select(row));
      this.examFindingSource.data.forEach(row => {
        row.enabled = !row.enabled;
      });
      this.isButtonEnable = false;
      // this.selection.isSelected();
    }
  }

  singleCheck(row) {
    this.selection.toggle(row);
    this.examFindingSource.data.find(value => (value.exam === row.exam)).enabled = !row.enabled;
  }

  ngOnInit() {
    this.examFindingSource.paginator = this.paginator;

  }
  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }
  onConfirmClick(): void {
    this.dialogRef.close('Confirm');
  }
}
