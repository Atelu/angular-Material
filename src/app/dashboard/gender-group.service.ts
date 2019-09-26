import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenderGroupService {
  baseUrl = 'http://192.168.1.106:3000/';
  configUrl = this.baseUrl + 'configuration/';

  constructor(private http: HttpClient) { }
  getGenderGroup(): Observable<any> {
    return this.http.get(this.configUrl + 'gendergroup');
  }

  saveGendergroup(gender: any): Observable<any> {
    return this.http.post(`${this.configUrl}/serviceplace`, gender);
}

updateGendergroup(value): Observable<any> {
return this.http.put(`${this.configUrl}/serviceplace/${value.id}`, value);
}
deleteGender(id): any {
  return this.http.delete(`${this.configUrl}/gendergroup/` + id);

}
}
