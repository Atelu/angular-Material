import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
import {DomSanitizer} from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ServiceplaceService {
  baseUrl = 'http://192.168.1.106:3000/';
  configUrl = this.baseUrl + 'configuration/';

  private serviceUrl = this.configUrl + 'serviceplace?size=1000';

  constructor( private http: HttpClient,  public sanitize: DomSanitizer ) { }

  sanitizeImgBytes(imageByte: string): any {
    // return this.sanitize.bypassSecurityTrustResourceUrl('data:image/png;base64' + imageByte);
    return 'data:image/png;base64,' + imageByte;
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(`${this.configUrl}/serviceplace`, user);
  }

  updateUser(value): Observable<any> {
    return this.http.put(`${this.configUrl}/serviceplace/${value.id}`, value);
  }
  getUser(): Observable<any> {
    return this.http.get<any>(this.serviceUrl);
  }
  getGenderGroup(): Observable<any> {
    return this.http.get(this.configUrl + 'gendergroup');
  }

  getAgeGroup(): Observable<any> {
    return this.http.get(this.configUrl + 'agegroup');
  }

  getServiceTypes(): Observable<any> {
    return this.http.get(this.configUrl + 'servicetypes');
  }

  getServicePlaceTypes(): Observable<any> {
    return this.http.get(this.configUrl + 'serviceplacetypes');
  }

  getPatientCategoryTypes(): Observable<any> {
    return this.http.get(this.configUrl + 'patientcategorytypes');
  }

  getClinicsAll(): Observable<any> {
    return this.http.get(this.configUrl + 'clinics/all');
  }

  getFacilityBranches(): Observable<any> {
    return this.http.get(this.configUrl + 'facility/branch');
  }

  getPatientStatus(): Observable<any> {
    return this.http.get(this.configUrl + 'patient/status');
  }
  getMainType(): Observable<any> {
    return this.http.get(this.configUrl + 'serviceplacetypes');
  }
  getAgeGroupCategory(): Observable<any> {
    return this.http.get(this.configUrl + 'agegroupcategories');
  }

  getFormOptions(): Observable<any> {
    return forkJoin([
      this.getGenderGroup(),
      this.getAgeGroup(),
      this.getServiceTypes(),
      this.getServicePlaceTypes(),
      this.getPatientCategoryTypes(),
      this.getClinicsAll(),
      this.getFacilityBranches(),
      this.getPatientStatus(),
      this.getMainType(),
      this.getAgeGroupCategory(),
    ]);
  }

  deleteServiceplace(id): Observable<any> {
    return this.http.delete(this.configUrl + 'serviceplace/' + id);

  }
}
