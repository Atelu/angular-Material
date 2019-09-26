import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogoverview',
  templateUrl: './dialogoverview.component.html',
  styleUrls: ['./dialogoverview.component.css']
})
export class DialogoverviewComponent implements OnInit {
  isloading = false;
  color = 'primary';
  mode = 'indeterminate';
  constructor(public dialogRef: MatDialogRef<DialogoverviewComponent>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }
  onConfirmClick(): void {
    if (status === 'Confirm') {
      this.dialogRef.close('Confirm');
      this.isloading = false;

    } else {
    this.isloading = true;
    }

  }


  ngOnInit() {
    console.log(this.data);

  }

}
