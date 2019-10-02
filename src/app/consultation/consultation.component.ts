import { DomSanitizer } from '@angular/platform-browser';
import { ExamFindingsComponent } from './../components/exam-findings/exam-findings.component';
import { Component, OnInit, ViewChild, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import {
  MatSidenav,
  MatTabChangeEvent,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar
} from '@angular/material';
import { AuthorizationService } from '../Utilities/authorization.service';
import { ConsultationService } from './consultation.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ConsultationDialogComponent } from '../components/consultation-dialog/consultation-dialog.component';
import { DiagnosisComponent } from '../components/diagnosis/diagnosis.component';
import { DocumentsComponent } from '../components/documents/documents.component';

export interface Search {
  value: string;
  viewValue: string;
}
export interface Doctor {
  id: number;
  name: string;
}
export interface Review {
  value: string;
  viewValue: string;
}
export interface Vital {
  value: string;
  viewValue: string;
}
// Data for datatable of vital signs
export interface PeriodicElement {
  description: string;
  measuredValue: number;
  remarks: string;
  date: any;

}
const ELEMENT_DATA: PeriodicElement[] = [
  { description: 'Temperature', measuredValue: 37, remarks: 'Normal', date: 'Dec 10, 2018' },
  { description: 'Weight', measuredValue: 55, remarks: 'ok', date: 'Dec 10, 2018' },
  { description: 'BMI', measuredValue: 16, remarks: 'Normal', date: 'Dec 10, 2018' },
  { description: 'Height', measuredValue: 5.85, remarks: '', date: 'Oct 10, 2018' },

];
// Data for datatable of Last Visit Info
export interface PeriodsElement {
  name: any;
  id: any;
  img: any;
}
const ELAMENTS_DATA: PeriodsElement[] = [
  { id: 1, name: 'MIRIAM QUANSAH p810730010', img: 'assets/images/logo/test2.jpg'},
  { id: 2, name: 'Mikeberg Afu Sitsofe p810730010',  img: 'assets/images/logo/test3.jpg' },
  { id: 3, name: 'Alice Aheto p810730010',  img: 'assets/images/logo/test1.jpg' },
  { id: 4, name: 'Ewoenam Aheto p810730010',  img: 'assets/images/logo/test3.jpg' },
  { id: 5, name: 'Queen Atelu p810730010',  img: 'assets/images/logo/test2.jpg' },

];
export interface PeriodicElements {
  name: string;
  record: any;

}
const ELEMENT_DATAS: PeriodicElements[] = [
  { name: 'Doctors', record: 'Dr. Wisedom, Dr. Ahoi' },
  { name: 'Date', record: '2018-01-01 07:35 AM' },
  { name: 'Clinics', record: '	General, Eye' },
  { name: 'Diagnosis', record: 'Malaria, Cataract' },
  // {name: 'Prescriptions', record: 'Paracetamol, Artesunate'},

];
export interface PeriodicsElements {
  name: string;
  record: any;

}
const ELEMENTS_DATAS: PeriodicsElements[] = [
  { name: 'Chronics', record: 'Diabetes, Hypertension' },
  { name: 'Allergies', record: 'Sulphur, Chloroquine' },
  { name: 'Procedure	', record: 'Hernia' },
  { name: 'Procedure	', record: 'Sample' },

];
export interface PeriodElements {
  description: string;
  remarks: any;

}
const ELAMENT_DATA: PeriodElements[] = [
  { description: 'Drug allergies', remarks: 'Chloroquine, Paracetamol' },
  { description: 'Food allergies', remarks: 'Garlic, Corn, Milk' },
  { description: 'Contact dermatitis', remarks: 'Nickel, Cobalt, Chromium salts' },


];
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})


export class ConsultationComponent implements OnInit {
  payloadArray = {
    enabled: true
  };
  dialogRef: any;
  roomPriceId: any;
  isButtonEnable = true;
  consultationStart = false;



  @ViewChild('commandbarSidenav', { static: false })

  public sidenav: MatSidenav;
  statusMessage: string;

  color = 'primary';
  mode = 'indeterminate';
  dataSource = new MatTableDataSource();
  consultationForm: FormGroup;
  consultForm: FormGroup;
  imgtop: any = 'assets/images/logo/profile.jpg';

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2019, 8, 25);


  minDates = new Date(2019, 0, 1);
  maxDates = new Date(2020, 8, 25);
    // img: any = 'assets/images/logo/test3.jpg';

  selectedIndex = 0;
  @Output() componentEvent = new EventEmitter<any>();


  @Output() toggleSidenav = new EventEmitter<void>();
  @ViewChild('paginator1', {static: true}) paginator1: MatPaginator;
  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('paginator3', { static: true }) paginator3: MatPaginator;
  @ViewChild('paginator4', { static: true}) paginator4: MatPaginator;



  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatPaginator) paginator1 = new QueryList<MatPaginator>();



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // search: Array<any> = [];
  // doctor: Array<any> = [];
  // review: Array<any> = [];
  // vitalsigns: Array<any> = [];
  selectedValue: string;
  selectedDoc: string;
  selectedRev: string;
  disableSelect = new FormControl(false);
  user: any;


  consultationSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  displayedColumns: string[] = [
    'name',
    'Measured Value',
    'Remarks',
    'Date',
  ];

  consultsSource = new MatTableDataSource<PeriodsElement>(ELAMENTS_DATA);

  displaysColumn: string[] = [
    'name',

  ];

  consultationsSource = new MatTableDataSource<PeriodicElements>(ELEMENT_DATAS);
  displayedColumn: string[] = [
    'name',
    'record',
  ];
  consultationsSources = new MatTableDataSource<PeriodicsElements>(ELEMENTS_DATAS);

  displayColumn: string[] = [
    'name',
    'record',
  ];
  consultSource = new MatTableDataSource<PeriodElements>(ELAMENT_DATA);

  displayColumns: string[] = [
    'description',
    'remarks',
  ];



  search: Search[] = [
    { value: 'steak-0', viewValue: 'Sample Param' },
  ];
  doctors = [
    { id: 1, name: 'Dr. Isaac Arthur' },
    { id: 2, name: 'Dr. Josephine' },
  ];
  names = [  // img: any = 'assets/images/logo/test3.jpg';

    { id: 1, name: 'Mikeberg Afu Sitsofe', img: 'assets/images/logo/test3.jpg' },
    { id: 2, name: 'MIRIAM QUANSAH', img: 'assets/images/logo/test2.jpg' },
    { id: 3, name: 'Alice Aheto', img: 'assets/images/logo/test1.jpg' }
  ];
  review: Review[] = [
    { value: 'steak-3', viewValue: 'Yes' },
    { value: 'steak-4', viewValue: 'No' },
  ];
  vitalsigns: Vital[] = [
    { value: 'steak-5', viewValue: 'Eye Vital Signs' }
  ];

  constructor(private authorizationService: AuthorizationService, private router: Router,
              public sanitizer: DomSanitizer, public snackBar: MatSnackBar,
              private consultationService: ConsultationService, private fb: FormBuilder, public dialog: MatDialog) {}

  applyFilter(filterValue) {
    this.consultationSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilters(filtersValue) {
    this.consultationsSource.filter = filtersValue.trim().toLowerCase();
  }

  applyFilterss(filtersValues) {
    this.consultationsSources.filter = filtersValues.trim().toLowerCase();
  }
  applyFiltersss(filterValues) {
    this.consultSource.filter = filterValues.trim().toLowerCase();
  }



  ngOnInit() {
    this.consultationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      age: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      gender: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      height: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      weight: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      bmi: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      bp: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      doctorid: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      bed: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      reviewid: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      consultationroom: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      consultationdate: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      reviewdate: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      reviewtime: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      generalremarks: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      doctor: new FormControl(this.doctors[1].name),
      selectedRev: new FormControl('', [Validators.required, Validators.maxLength(10)]),

      vitalsignsid: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
    this.consultationSource.paginator = this.paginator1;
    this.consultsSource.paginator = this.paginator2;
    this.consultationsSources.paginator = this.paginator3;
    this.consultSource.paginator = this.paginator4;

  }
  setAge() {
    this.consultationForm.get('age').setValue('20');
  }
  submitForm(): void {
    if (this.consultationForm.invalid) {
      return;
    }
  }
  logout(): void {
    this.authorizationService.logout();
    this.router.navigate(['/login']);
  }
  button(): void { }

  // adding Complaints/Clinical Notes
  openDialog(): void {

    if (this.consultationStart === true) {


      const dialogRef = this.dialog.open(ConsultationDialogComponent, {
        width: '700px',
      });



      dialogRef.afterClosed().subscribe(result => {

        if (result === 'Confirm') {

          console.log('The dialog was closed');
        } else {
          if (result === 'Cancel') {
            this.dialog.closeAll();
          }
        }
      });
    } else {
      alert('start Consultation');
    }

  }
  // adding Diagnosis
  openDiagnosis(): void {

    if (this.consultationStart === true) {

      const dialogRef = this.dialog.open(DiagnosisComponent, {
        width: '1000000%',
        height: '300%'

      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === 'Confirm') {

          console.log('The dialog was closed');
        } else {
          if (result === 'Cancel') {
            this.dialog.closeAll();
          }
        }
      });
    } else {
      alert('start Consultation');
    }
  }
  // adding Documents
  openDocument(): void {

    if (this.consultationStart === true) {

      const dialogRef = this.dialog.open(DocumentsComponent, {
        width: '1200px',
        height: '500px'
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === 'Confirm') {

          // console.log('The dialog was closed');
        } else {
          if (result === 'Cancel') {
            this.dialog.closeAll();
          }
        }
      });
    } else {

      alert('start Consultation');
    }
  }
  // adding Exams And Findings
  openExam(): void {

    if (this.consultationStart === true) {
      const dialogRef = this.dialog.open(ExamFindingsComponent, {
        width: '1200px',
        height: '500px'
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === 'Confirm') {

          console.log('The dialog was closed');
        } else {
          if (result === 'Cancel') {
            this.dialog.closeAll();
          }
        }
      });
    } else {
      // this.openSnackBar(this.statusMessage, 'Please Start Consultation');
      alert('Start Consultation');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  // clear consultation form
  clearForm(): void {
    this.consultationForm.reset();
    this.imgtop = 'assets/images/logo/profile.jpg';
    this.consultationStart = false;
    this.isButtonEnable = true;
    // alert ('Consultation Ended');
    this.openSnackBar(this.statusMessage, 'Consultation Ended Successfully');



  }

  clearConsult(): void {
    this.consultationForm.reset();
    this.imgtop = 'assets/images/logo/profile.jpg';
    this.consultationStart = false;

  }

  addConsult() {
    this.componentEvent.emit({ selectedIndex: 1 });
    this.selectedIndex = this.selectedIndex - 1;
    this.clearConsult();
  }

  // setting data to form
  setDefaultValue(): void {
    this.consultationForm.patchValue({
      name: this.names[1].name, gender: 'male', age: '25', height: '4.5m',
      weight: '7kg', bmi: '18.5', bp: '160/80', doctor: this.doctors[1].name, img: this.names[2].img
    });
    this.componentEvent.emit({ selectedIndex: 1 });
    this.selectedIndex = this.selectedIndex + 1;
    this.isButtonEnable = false;
    this.consultationStart = true;
    // alert ('Consultation has started');
    this.openSnackBar(this.statusMessage, 'Consultation has Started Successfully');

    if (this.imgtop  != null) {
    this.imgtop = 'assets/images/logo/test1.jpg';
    } else {
      this.imgtop = 'assets/images/logo/profile.jpg';
    }
  }

  serviceplaceheadsignatureChange(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.imgtop = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.imgtop = 'assets/images/logo/profile.jpg';
  }

}
