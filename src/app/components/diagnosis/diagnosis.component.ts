import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

export interface Type {
  value: string;
  viewValue: string;
}
export interface Category {
  value: string;
  viewValue: string;
}
export interface Outcome {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {

  description: string;
  type: any;
  principal: any;
  category: any;
  outcome: any;
  remarks: any;
  view: any;
  enabled: any;

}
const ELEMENT_DATA: PeriodicElement[] = [
  // {description: 'ACUTE APPENDICITIS', type: 37, principle: 'Normal', category : '', outcome: '', remarks: '', view: ''},
  { description: 'ACUTE APPENDICITIS', type: '', principal: '', category: '', outcome: '', remarks: '', view: '', enabled: true },
  { description: 'ASTHMA', type: '', principal: '', category: '', outcome: '', remarks: '', view: '', enabled: true },
  // { description: 'COMMON COLD', type: '', principal: '', category: '', outcome: '', remarks: '', view: '' },
  // { description: 'DIABETES', type: '', principal: '', category: '', outcome: '', remarks: '', view: '' },


  // {description: 'ACUTE APPENDICITIS'},


];


@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  selectedRev: string;
  selectedCat: string;
  selectedOut: string;
  isButtonEnable = true;



  diagnosisSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  displayedColumns: string[] = [
    'select',
    'description',
    'type',
    'principal',
    'category',
    'outcome',
    'remarks',
    'view',
  ];
  type: Type[] = [
    { value: 'steak-0', viewValue: 'Yes' },
    { value: 'steak-1', viewValue: 'No' },

  ];
  category: Category[] = [
    { value: 'steak-2', viewValue: 'Final' },
    { value: 'steak-3', viewValue: 'Provisional' },

  ];
  outcome: Outcome[] = [
    { value: 'steak-4', viewValue: 'Transfred Externally Out' },
    { value: 'steak-5', viewValue: 'Refered Externally in' },
    { value: 'steak-5', viewValue: 'Discharged Satisfactory' },
    { value: 'steak-5', viewValue: 'Dead' },
    { value: 'steak-5', viewValue: 'Refered Externally Out' },
    { value: 'steak-5', viewValue: 'Return For Review' },
    { value: 'steak-5', viewValue: 'Pending Diagnostic Investigation' },






  ];

  constructor(public dialogRef: MatDialogRef<DiagnosisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selection.changed.subscribe(item => {
      this.isButtonEnable = this.selection.selected.length === 0;
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(filterValue) {
    this.diagnosisSource.filter = filterValue.trim().toLowerCase();

  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.diagnosisSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isButtonEnable = true;
      this.diagnosisSource.data.forEach(row => {
        row.enabled = !row.enabled;
      });
    } else {
      this.diagnosisSource.data.forEach(row => this.selection.select(row));
      this.isButtonEnable = false;
      this.diagnosisSource.data.forEach(row => {
        row.enabled = !row.enabled;
      });
    }
  }
  singleCheck(row) {
    this.selection.toggle(row);
    this.diagnosisSource.data.find(value => (value.description === row.description)).enabled = !row.enabled;
  }



  ngOnInit() {
    this.diagnosisSource.paginator = this.paginator;

  }
  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }
  onConfirmClick(): void {
    this.dialogRef.close('Confirm');
  }
}
