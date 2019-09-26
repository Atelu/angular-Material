import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-consultation-dialog',
  templateUrl: './consultation-dialog.component.html',
  styleUrls: ['./consultation-dialog.component.css']
})
export class ConsultationDialogComponent implements OnInit {
  consultsForm: FormGroup;
  loginClick = false;
  isButtonEnable = true;



  constructor(public dialogRef: MatDialogRef<ConsultationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.isButtonEnable = true;

    this.consultsForm = this.formBuilder.group({
      text: [''],
      // password: ['']
  });
    this.isButtonEnable = true;

  }
  onSubmit(): void {

  }

  onClearText(): void {
    this.loginClick = true;
    this.isButtonEnable = false;
  }

  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }
  onConfirmClick(): void {
    this.dialogRef.close('Confirm');
  }

}
