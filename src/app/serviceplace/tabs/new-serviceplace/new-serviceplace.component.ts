import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceplaceService } from '../../serviceplace.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogoverviewComponent } from 'src/app/components/dialogoverview/dialogoverview.component';
import { Serviceplace } from 'src/app/models/serviceplace';
import * as _ from 'lodash';

@Component({
  selector: 'app-new-serviceplace',
  templateUrl: './new-serviceplace.component.html',
  styleUrls: ['./new-serviceplace.component.css'],
  providers: [ServiceplaceService]

})
export class NewServiceplaceComponent implements OnInit {
  serviceForm: FormGroup;
  editPlaceId: any = null;
  editPlaceData: any = {};
  showTable: boolean;
  statusMessage: string;
  users: Serviceplace[];
  logo: any = 'assets/images/logo/profile.jpg';
  imgSignature: any = 'assets/images/logo/profile.jpg';


  /** age group filtered by ageCategoryId */

  selectAgeGroups: any[] = [];


  selection = new SelectionModel(true, []);

  @Output() savedPlace = new EventEmitter<any>();
  @Output() componentEvent = new EventEmitter<any>();


  gendergroup: Array<any> = [];
  agegroup: Array<any> = [];
  servicetypes: Array<any> = [];
  serviceplacetypes: Array<any> = [];
  patientcategorytype: Array<any> = [];
  patientstatus: Array<any> = [];
  agegroupcategory: Array<any> = [];
  clinics: Array<any> = [];
  facilitybranch: Array<any> = [];
  maintype: Array<any> = [];
  AllAgegroups: Array<any> = [];
  txtAgeGroupCat: AbstractControl;


  constructor(private serviceplaceService: ServiceplaceService,
              private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
              public dialog: MatDialog, public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getFormOptions();


    this.serviceForm = this.fb.group({
      name: ['GHGGJMJMJG', [Validators.required]],
      code: ['', Validators.required],
      agegroupcategoryid: [null, Validators.required],
      gendergroupid: [null, Validators.required],
      servicePlacePatientCategories: [[], Validators.required],
      patientstatusid: [null, Validators.required],
      servicePlaceServicePlaceTypes: [[], Validators.required],
      servicePlaceAgegroups: [[], Validators.required],
      clinicserviceplaces: [[], Validators.required],
      servicePlaceBranches: [[], Validators.required],
      maintypeid: [null, Validators.required],
      headname: ['', [Validators.required]],
      ServicePlaceServiceTypes: [[], Validators.required],
      createuserid: [''],
      isactive: [true],


    });
    // get reference to ageCategory so to track its value changes to filter for age group
    this.txtAgeGroupCat = this.serviceForm.controls.agegroupcategoryid;

    // // listen for changes from age group category
    this.onAgeCategoryValueChange();
  }
  fillForm(data): void {
    console.log('fill form', data);
    this.serviceForm.reset();
    this.serviceForm.patchValue({
      name: data.name,
      code: data.code,
      gendergroupid: data.gendergroupid,
      servicePlacePatientCategories: data.servicePlacePatientCategories.map(x => x.patientcategoryid),
      patientstatusid: data.patientstatusid,
      servicePlaceServicePlaceTypes: data.servicePlaceServicePlaceTypes.map(x => x.serviceplacetypeid),
      agegroupcategoryid: data.agegroupcategoryid,
      clinicserviceplaces: data.clinicserviceplaces.map(x => x.clinicid),
      servicePlaceAgegroups: data.servicePlaceAgegroups.map(x => x.agegroupid),
      servicePlaceBranches: data.servicePlaceBranches.map(x => x.branchid),
      maintypeid: data.maintypeid,
      headname: data.headname,
      ServicePlaceServiceTypes: data.servicePlaceServiceTypes.map(x => x.servicetypeid),
      createuserid: data.createuserid,
      isactive: data.isactive,
    });
    console.log('data', data);

    this.editPlaceData = data;
    this.editPlaceId = data.id;
    // this.logo = data.logopicture;
    this.logo = data.logopicture && this.serviceplaceService.sanitizeImgBytes(data.logopicture);
    this.imgSignature = data.headsignaturepicture && this.serviceplaceService.sanitizeImgBytes(data.headsignaturepicture);



    if (data.logopicture || data.imgSignature != null) {
      this.logo = data.logopicture;
      this.imgSignature = data.headsignaturepicture;
    } else {
      this.logo = 'assets/images/logo/profile.jpg';
      this.imgSignature = 'assets/images/logo/profile.jpg';
    }

  }

  // stop here if form is invalid
  submitForm(): void {
    if (this.serviceForm.invalid) {
      return;
    }
  }

  clearForm(): void {
    this.serviceForm.reset();
    this.logo = null;
    this.imgSignature = null;

  }

  save(): void {
    if (this.serviceForm.invalid) {
      Object.keys(this.serviceForm.controls).forEach((controlName) => {
        this.serviceForm.controls[controlName].markAsTouched({ onlySelf: true });
      });
      alert('Complete the form, The form contains errors');

      this.savedPlace.emit({ success: false });
      return;
    } else {

      const placeData = _.cloneDeep(this.serviceForm.value);
      // extract ids for multi-select
      // placeData.logopicture = this.logo;

      placeData.servicePlaceAgegroups = this.serviceForm.value.servicePlaceAgegroups.map(x => {
        return { agegroupid: x };
      });

      placeData.servicePlaceServiceTypes = this.serviceForm.value.servicePlaceServicePlaceTypes.map(x => {
        return { servicetypeid: x };
      });

      placeData.servicePlaceServicePlaceTypes = this.serviceForm.value.servicePlaceServicePlaceTypes.map(x => {
        return { serviceplacetypeid: x };
      });

      placeData.servicePlacePatientCategories = this.serviceForm.value.servicePlacePatientCategories.map(x => {
        return { patientcategoryid: x };
      });

      placeData.servicePlaceBranches = this.serviceForm.value.servicePlaceBranches.map(x => {
        return { branchid: x };
      });

      placeData.clinicserviceplaces = this.serviceForm.value.clinicserviceplaces.map(x => {
        return { clinicid: x };
      });


      placeData.isactive = this.serviceForm.value.isactive;
      placeData.logopicture = this.logo;
      placeData.headsignaturepicture = this.logo;
      // placeData.logopicture = this.logo && this.logo.split(',')[1];
      // placeData.headsignaturepicture = this.imgSignature && this.imgSignature.split(',')[1];
  // console.log();
      if (!this.editPlaceId) {
        console.log('New Place');
        this.saveNew(placeData);
      } else {

        placeData.id = this.editPlaceId;
        this.update(placeData);
        this.clearForm();
        console.log(placeData);
      }
    }
  }
  // snackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  // material dialog
  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogoverviewComponent, {
      width: '250px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  saveNew(place): void {
    console.log('Saving New place ', place);
    this.serviceplaceService.saveUser(place)
      .subscribe(
        data => {
          this.statusMessage = 'Service place saved.',
            this.showTable = false;
          this.openSnackBar(this.statusMessage, 'Successfully');
          this.clearForm();
          this.serviceplaceService.getUser();
        },
        error => {
          this.showTable = false;
          this.openSnackBar(error.statusText, 'Error');
        }
      );
  }



  update(place): void {
    // console.log('place', place);
    const originalData = this.editPlaceData;
    Object.keys(originalData).forEach((key) => {
      if (place[key]) { originalData[key] = place[key]; }
    });
    originalData.isactive = place.isactive;
    this.serviceplaceService.updateUser(originalData)
      .subscribe(
        data => {
          // console.log('place', place);

          if (data.status === 'SUCCESS') {
            // const dialogRef = this.dialog.open(DialogoverviewComponent);
            this.statusMessage = 'Service Place updated.',
              this.showTable = false;
            // this.openSnackBar(this.statusMessage, 'Successfully');
            this.componentEvent.emit({ selectedIndex: 0 });

            this.clearForm();
          }
        }
      );
  }


  getFormOptions(): void {
    this.serviceplaceService.getFormOptions().subscribe(data => {
      this.gendergroup = data[0].data.content ? data[0].data.content : [];
      this.agegroup = data[1].data.content ? data[1].data.content : [];
      this.servicetypes = data[2].data.content ? data[2].data.content : [];
      this.serviceplacetypes = data[3].data.content ? data[3].data.content : [];
      this.patientcategorytype = data[4].data.content ? data[4].data.content : [];
      this.clinics = data[5].data.content ? data[5].data.content : [];
      this.facilitybranch = data[6].data.content ? data[6].data.content : [];
      this.patientstatus = data[7].data.content ? data[7].data.content : [];
      this.maintype = data[8].data.content ? data[8].data.content : [];
      this.agegroupcategory = data[9].data.content ? data[9].data.content : [];

      // console.log('age category', this.agegroupcategory);

    });
  }

  /**
     * filter age groups by its category
     * @param id
     */
  filterAgeGroupByCatId(id: number): any[] {
    console.log('filter by id', id);
    if (id) {
      // make a copy of the age groups
      const ageGroupsCopy = this.agegroup.slice();
      return ageGroupsCopy.filter(x => x.agegroupcategoryid === id);
    } else {
      return [];
    }
  }
  onAgeCategoryValueChange(): void {
    this.txtAgeGroupCat.valueChanges.subscribe(

      // this.serviceForm.get('agegroupcategoryid').valueChanges.subscribe(
      value => {

        // filter ageGroups as a data source for age group drop down
        // this.selectedAgeGroup = this.filterAgeGroupByCatId(value);
        // console.log(value);
        // const selectAgeGroups = this.agegroupcategory.find(x => x.id === value);
        // this.AllAgegroups = selectAgeGroups.agegroups;
        this.AllAgegroups = this.filterAgeGroupByCatId(value);

        console.log(this.AllAgegroups);
        console.log('value', value);

        // this.selectAgeGroups = this.agegroupcategory.find(x => x.id === value);
        // console.log(this.selectAgeGroups);
      }
    );
  }
  serviceplacelogoChange(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.logo = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.logo = 'assets/images/logo/profile.jpg';
  }

  serviceplaceheadsignatureChange(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.imgSignature = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.imgSignature = 'assets/images/logo/profile.jpg';
  }

}


