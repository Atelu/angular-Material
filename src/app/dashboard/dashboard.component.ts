import { GenderGroupService } from './gender-group.service';
import { AuthorizationService } from './../Utilities/authorization.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSidenav, MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { NewGendergroupComponent } from './tabs/new-gendergroup/new-gendergroup.component';
import { ListGendergroupComponent } from './tabs/list-gendergroup/list-gendergroup.component';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('commandbarSidenav', {static: false})
  public sidenav: MatSidenav;
  // tslint:disable-next-line:ban-types
  selectedIndex: Number = 0;
  @ViewChild(NewGendergroupComponent,  {static: false}) newGendergroup: NewGendergroupComponent;
  @ViewChild(ListGendergroupComponent,  {static: false}) AllGendergroup: ListGendergroupComponent;

  myWorkRoutes: ROUTE[] = [
    {
      icon: 'assignment',
      route: 'sales/activities',
      title: 'Activities',
    }, {
      icon: 'dashboard',
      route: 'sales/dashboards',
      title: 'Dashboards',
    }
  ];

  customerRoutes: ROUTE[] = [
    {
      icon: 'contacts',
      route: 'sales/accounts',
      title: 'Accounts',
    }, {
      icon: 'people',
      route: 'sales/contacts',
      title: 'Contacts',
    }, {
      icon: 'settings_phone',
      route: 'sales/leads',
      title: 'Leads',
    }, {
      icon: 'account_box',
      route: 'sales/opportunities',
      title: 'Opportunities',
    }
  ];


  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private authorizationService: AuthorizationService, private router: Router,
              private gendergroupService: GenderGroupService) { }
  ngOnInit() {
  }

  receiveSelectedindex($event): void {
    this.selectedIndex = $event.selectedIndex;
    if ($event.formdata) {
        // this.newGendergroup.fillForm($event.formdata);
    }
    if ($event.reload) {
      // this.AllGendergroup.getUser();
  }
}

tabchanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.selectedIndex = tabChangeEvent.index;
    // this.AllServiceplace.getUser();
}
  logout(): void {
    this.authorizationService.logout();
    this.router.navigate(['/login']);
  }

}
