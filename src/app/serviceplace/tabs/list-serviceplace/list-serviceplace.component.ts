import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceplaceService } from '../../serviceplace.service';
import { Serviceplace } from 'src/app/models/serviceplace';
import { DialogoverviewComponent } from 'src/app/components/dialogoverview/dialogoverview.component';

@Component({
  selector: 'app-list-serviceplace',
  templateUrl: './list-serviceplace.component.html',
  styleUrls: ['./list-serviceplace.component.css']
})
export class ListServiceplaceComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  isloading = true;
  users: Serviceplace[];
  tableform: FormGroup;
  selectedIndex = 0;
  selected = false;
  tableData = null;
  showTable: boolean;
  statusMessage: string;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'Code',
    'Gender',
    'Patient Status',
    'Main Type',
    'Head name',
    'isActive',
    'Actions'
  ];
  @Output() componentEvent = new EventEmitter<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private serviceplaceService: ServiceplaceService,
              public dialog: MatDialog, public snackBar: MatSnackBar) { }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.getUser();
  }
  nextStep(row) {
    this.componentEvent.emit({ selectedIndex: 1, formdata: row });
    this.selectedIndex = this.selectedIndex + 1;
    // this.fillForm(row);
  }

  previousStep() {

    this.selectedIndex = this.selectedIndex - 1;
    // console.log(this.selectedIndex);
  }
  getUser(): void {
    this.serviceplaceService.getUser().subscribe(
      users => {
        this.tableData = users.data.content;
        this.initTable();
        this.isloading = false;
        // this.componentEvent.emit({ selectedIndex: 1, formdata: users });

      },
      error => (this.isloading = false)
    );
  }
  show() {
    this.showTable = true;
    this.tableData = this.displayedColumns;
  }
  load(): void {

    this.getUser();
    this.isloading = true;

  }

  initTable(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
  }
  deleteServiceplace(Id: string): void {
    this.serviceplaceService.deleteServiceplace(Id).subscribe(
        result => {
            if (result.status === 100) {
                this.load();
                alert(result.message);
            }
        }
    );
}
  // material dialog
  openDialog(user): void {
    const dialogRef = this.dialog.open(DialogoverviewComponent, {
        width: '250px',
        data: user,
    });

    dialogRef.afterClosed().subscribe(result => {

        if (result === 'Confirm') {
            this.deleteServiceplace(user.id);
            // this.getAllRoomTypes();
            console.log('The dialog was closed');
        } else {
            if (result === 'Cancel') {
                this.dialog.closeAll();
            }
        }
    });
}

}
