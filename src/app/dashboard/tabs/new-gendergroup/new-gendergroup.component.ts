import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenderGroupService } from '../../gender-group.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-new-gendergroup',
  templateUrl: './new-gendergroup.component.html',
  styleUrls: ['./new-gendergroup.component.css']
})
export class NewGendergroupComponent implements OnInit {
  serviceForm: FormGroup;
  showTable: boolean;
  gendergroup: any;
  // tslint:disable-next-line:ban-types
  editstate: Boolean = false;
  genderId: any;
  @Output() componentEvent = new EventEmitter<any>();


  constructor(private gendergroupService: GenderGroupService, private fb: FormBuilder,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', Validators.required],
      isactive: [true],

    });
    this.getAllGenderGroup();
  }

  getAllGenderGroup(): void {
    this.gendergroupService.getGenderGroup().subscribe(
      result => {
        if (result != null) {
          this.gendergroup = result;
        }
      }
    );
  }
  fillForm(data): void {
    console.log('fill form', data);
    this.serviceForm.reset();
    this.serviceForm.patchValue({
      id: data.id,
      name: data.name,
      isactive: data.isactive,
    });

  }
  submitForm(): void {
    if (this.serviceForm.invalid) {
      return;
    }
  }

  clearForm(): void {
    this.serviceForm.reset();
  }
  save(): void {

    if (this.editstate === false) {
      this.create();
    } else {
      this.edit();
      this.editstate = false;
    }
  }
  create(): void {
    const data = this.serviceForm.value;
    // console.log(data);

    this.gendergroupService.saveGendergroup(data).subscribe(
        result => {
            if (result.status === 'Success') {
                this.snackBar.open(result.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });

                this.componentEvent.emit({ selectedIndex: 0 });
                this.serviceForm.reset();
            } else {
                this.snackBar.open(result.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }

        },
        error => {
            this.snackBar.open(error, 'dismiss', {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    );
}

edit(): void {
    const data = this.serviceForm.value;
    // console.log(data);
    data.Id = this.genderId;
    this.gendergroupService.updateGendergroup(data).subscribe(
        result => {
            if (result.status === 'Success') {
                this.snackBar.open(result.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });

                this.componentEvent.emit({ selectedIndex: 0 });
                this.serviceForm.reset();
            } else {
                this.snackBar.open(result.message, 'dismiss', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }

        },
        error => {
            this.snackBar.open(error, 'dismiss', {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    );
}
}
