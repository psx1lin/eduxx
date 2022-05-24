import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { URLs } from './url.data';
import { OAEmp } from '../Modals/oa.interface';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor(private http: HttpClient) { }

  Get_edudrpoint() {
    const url = `${URLs.Url_edudrpoint}?num=10`;
    return this.http.get(url);
  }


 /**
  *讀取員工資訊
  *
  * 回傳: OAEmp pd:true ->ok 
  */
  Get_empinfo(oaemp :OAEmp) {
    const url = URLs.Url_empinfo;
    const data = oaemp;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }


   /**
  *讀取員工資訊
  *
  * 回傳: true/false
  */
  Get_getdrpoint(oaemp :OAEmp) {
    const url = URLs.Url_getdrpoint;
    const data = oaemp;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, JSON.stringify(data), httpOptions);
  }
  

}
