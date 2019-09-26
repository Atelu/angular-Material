import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatPaginator } from '@angular/material';
import { PeriodicElement, DiagnosisComponent } from '../diagnosis/diagnosis.component';

export interface PeriodicElement {

  documenttype: any;
  name: any;
  remarks: any;
  view: any;
  delete: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  // {documentType: 'APPENDICITIS', name: 'Medicine', remarks: 'Normal', view : 'hello', delete: 'source'},

];
export interface Attachment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedValue: string;

  documentSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = [
    'documentType',
    'name',
    'remarks',
    'view',
    'delete',

  ];
  attachment: Attachment[] = [
    {value: 'steak-0', viewValue: 'Investigation'},
    {value: 'steak-0', viewValue: 'Consultation'},
    {value: 'steak-0', viewValue: 'Surgery'},
    {value: 'steak-0', viewValue: 'X-Ray'},



  ];
  constructor(public dialogRef: MatDialogRef<DiagnosisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.documentSource.paginator = this.paginator;

  }
  applyFilter(filterValue) {
    this.documentSource.filter = filterValue.trim().toLowerCase();

  }
  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }
  onConfirmClick(): void {
    this.dialogRef.close('Confirm');
  }
}
