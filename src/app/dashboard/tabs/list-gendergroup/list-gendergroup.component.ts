import { GenderGroupService } from './../../gender-group.service';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { DialogoverviewComponent } from 'src/app/components/dialogoverview/dialogoverview.component';

@Component({
  selector: 'app-list-gendergroup',
  templateUrl: './list-gendergroup.component.html',
  styleUrls: ['./list-gendergroup.component.css']
})
export class ListGendergroupComponent implements OnInit {
  isloading = true;
  tableform: FormGroup;
  showTable: boolean;
  selectedIndex = 0;
  tableData = null;
  color = 'primary';
  mode = 'indeterminate';



  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'name',
    'isactive',
    'action'

  ];

  @Output() componentEvent = new EventEmitter<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private gendergroupService: GenderGroupService,
              public dialog: MatDialog, public snackBar: MatSnackBar) { }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.getAllGendergroup();
  }
  nextStep(row) {
    this.componentEvent.emit({ selectedIndex: 1, formdata: row });
    this.selectedIndex = this.selectedIndex + 1;
  }

  previousStep() {

    this.selectedIndex = this.selectedIndex - 1;
  }
  getAllGendergroup(): void {
    this.gendergroupService.getGenderGroup().subscribe(
      users => {
        this.tableData = users.data.content;
        this.initTable();
        this.isloading = false;
        console.log(this.tableData);

      },
      error => (this.isloading = false)
    );
  }
  initTable() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  load(): void {

    this.getAllGendergroup();
    this.isloading = true;

  }
    // material dialog
    openDialog(gendergroup): void {
      const dialogRef = this.dialog.open(DialogoverviewComponent, {
          width: '250px',
          data: gendergroup,
      });

      dialogRef.afterClosed().subscribe(result => {

          if (result === 'Confirm') {
              this.deleteGender(gendergroup.id);
              console.log('The dialog was closed');
          } else {
              if (result === 'Cancel') {
                  this.dialog.closeAll();
              }
          }
      });
  }
  deleteGender(Id: string): void {
    this.gendergroupService.deleteGender(Id).subscribe(
        result => {
            if (result.status === 100) {
                this.getAllGendergroup();
            }
        }
    );
}
}
