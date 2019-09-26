import { AuthorizationService } from './Utilities/authorization.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatFormFieldModule, MatCardModule,  MatCheckboxModule,  MatTooltipModule,
  MatInputModule, MatButtonModule,
  MatDialogModule, MatToolbarModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatPaginatorModule, MatSortModule, MatIconModule, MatTabsModule,
  MatSnackBarModule, MatRadioModule, MatDatepickerModule, MatListModule,
  MatNativeDateModule, MatSelectModule, MatTableModule, MatMenuModule, MatSidenavModule
} from '@angular/material/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyInterceptor, ContentType } from './Utilities/Httpinterceptor';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceplaceComponent } from './serviceplace/serviceplace.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ListServiceplaceComponent } from './serviceplace/tabs/list-serviceplace/list-serviceplace.component';
import { NewServiceplaceComponent } from './serviceplace/tabs/new-serviceplace/new-serviceplace.component';
import { DialogoverviewComponent } from './components/dialogoverview/dialogoverview.component';
import { ServiceplaceService } from './serviceplace/serviceplace.service';
import { ListGendergroupComponent } from './dashboard/tabs/list-gendergroup/list-gendergroup.component';
import { NewGendergroupComponent } from './dashboard/tabs/new-gendergroup/new-gendergroup.component';
import { ConsultationComponent } from './consultation/consultation.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ConsultationDialogComponent } from './components/consultation-dialog/consultation-dialog.component';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ExamFindingsComponent } from './components/exam-findings/exam-findings.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ServiceplaceComponent,
    ListServiceplaceComponent,
    NewServiceplaceComponent,
    DialogoverviewComponent,
    ListGendergroupComponent,
    NewGendergroupComponent,
    ConsultationComponent,
    ConsultationDialogComponent,
    DiagnosisComponent,
    DocumentsComponent,
    ExamFindingsComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatTabsModule, HttpClientModule, MatTooltipModule,
    AppRoutingModule, MatFormFieldModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatCheckboxModule,
  MatSnackBarModule, MatRadioModule, MatDatepickerModule, MatDialogModule, MatToolbarModule, MatProgressBarModule,
  MatInputModule, MatButtonModule,  MatNativeDateModule, MatSelectModule, MatTableModule, MatMenuModule, MatPaginatorModule, MatSortModule,
  FlexLayoutModule, MatSidenavModule, MatListModule, LayoutModule, MatButtonToggleModule, NgxMaterialTimepickerModule,
  // TranslateModule.forRoot()
  ],
  entryComponents: [ DialogoverviewComponent, ConsultationDialogComponent,
    DiagnosisComponent, DocumentsComponent, ExamFindingsComponent],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentType,
      multi: true
    },
    AuthorizationService , ServiceplaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
