import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthorizationService } from '../Utilities/authorization.service';
import { MatSidenav, MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { NewServiceplaceComponent } from './tabs/new-serviceplace/new-serviceplace.component';
import { ListServiceplaceComponent } from './tabs/list-serviceplace/list-serviceplace.component';

@Component({
  selector: 'app-serviceplace',
  templateUrl: './serviceplace.component.html',
  styleUrls: ['./serviceplace.component.css']
})
export class ServiceplaceComponent implements  OnInit {
  @ViewChild('commandbarSidenav', {static: false})
  public sidenav: MatSidenav;
  // tslint:disable-next-line:ban-types
  selectedIndex: Number = 0;
  @ViewChild(NewServiceplaceComponent,  {static: false}) newServiceplace: NewServiceplaceComponent;
  @ViewChild(ListServiceplaceComponent,  {static: false}) AllServiceplace: ListServiceplaceComponent;


  constructor(private authorizationService: AuthorizationService, private router: Router) { }
  @Output() toggleSidenav = new EventEmitter<void>();

  ngOnInit() {
  }
  receiveSelectedindex($event): void {
    this.selectedIndex = $event.selectedIndex;
    if ($event.formdata) {
        this.newServiceplace.fillForm($event.formdata);
    }
    if ($event.reload) {
      this.AllServiceplace.getUser();
  }
}

tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.selectedIndex = tabChangeEvent.index;
    this.AllServiceplace.getUser();
}
  logout(): void {
    this.authorizationService.logout();
    this.router.navigate(['/login']);
  }

}
