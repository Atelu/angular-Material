import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatPaginator} from '@angular/material';
import {PeriodicElement, DiagnosisComponent} from '../diagnosis/diagnosis.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface UsersData {
  id: any;
  documentType: any;
  name: any;
  remarks: any;
  view: any;
  delete: any;
}

const ELEMENT_DATA: UsersData[] = [
  // { documentType: '', name: '', remarks: '', view : '', delete: ''},

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
  myForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<DiagnosisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  selectedValue: string;
  value1 = '';
  value2 = '';
  value3 = '';

  documentSource = new MatTableDataSource<UsersData>(ELEMENT_DATA);
  // documentSource = ELEMENT_DATA;
  displayedColumns: any [] = [
    'documentType',
    'name',
    'remarks',
    'view',
    'delete',

  ];


  attachment = [
    {id: 0, name: 'Investigation'},
    {id: 1, name: 'Consultation'},
    {id: 2, name: 'Surgery'},
    {id: 3, name: 'X-Ray'},

  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      attachment: new FormControl('', [Validators.minLength(5)]),
      name: new FormControl('', [Validators.minLength(5)]),
      remarks: new FormControl('', [Validators.minLength(5)]),


    });
    this.documentSource.paginator = this.paginator;

  }
  submitForm(): void {
    if (this.myForm.invalid) {
      Object.keys(this.myForm.controls).forEach((controlName) => {
        this.myForm.controls[controlName].markAsTouched();
        this.myForm.controls[controlName].updateValueAndValidity();
      });
    // for (const i in this.myForm.controls) {
    //   this.myForm.controls[i].markAsDirty();
    //   this.myForm.controls[i].updateValueAndValidity();
    }
  }


  addElement() {
    ELEMENT_DATA.push({ id: this.attachment[this.value3].id,
      documentType: this.attachment[this.value3].name, name: this.value1, remarks: this.value2,
      view: 'view', delete: 'delete'
    });

    // console.log(ELEMENT_DATA);
    this.documentSource = new MatTableDataSource(ELEMENT_DATA);
    this.myForm.reset();
  }

  delete(element) {

    // let index = ELEMENT_DATA.findIndex(x => x.position == row.position);

    if (i => i !== -1) {
      ELEMENT_DATA.splice(element, 1);
    }
    this.documentSource = new MatTableDataSource<UsersData>(ELEMENT_DATA);
  // ELEMENT_DATA.filter(i => i !== element);
  //   this.documentSource.data = this.documentSource.data.filter((value, key ) => {
  //     return value.id !== element.id;
  //   });
    // this.datas = this.documentSource.data.filter(i => i !== element);
    // console.log( this.documentSource.data.filter(i => i !== element));
    // this.documentSource.data = this.documentSource.data.filter(i => i !== element);
    // this.documentSource.data.splice(this.documentSource.data.indexOf(element.id), 1);
  // this.documentSource = new MatTableDataSource(ELEMENT_DATA);

}

  view() {

  }

  applyFilter(filterValue) {
    this.documentSource.filter = filterValue.trim().toLowerCase();

  }

  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }

  onConfirmClick(): void {
    // if (this.myForm.untouched) {
      // alert ('Nothing to save');
    // } else {

      alert ('No API to connect to');
    }
  // }
}
