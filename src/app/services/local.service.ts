import { Injectable } from '@angular/core';
import { OAEmp } from '../Modals/oa.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  // public get Empno(): string{
  //     return localStorage.getItem('e')!;
  // }
  // public set Empno(value: string){
  //     localStorage.setItem('e',value);
  // }

  public get oAEmp(): string {
      console.log(`LocalService:${localStorage.getItem('OAEmp')}`);
      localStorage.clear;
      return localStorage.getItem('OAEmp')!;
  }

  public set oAEmp(value: string) {
        localStorage.setItem('OAEmp',value);
  }

  public  LocalClear() {
    localStorage.clear;
  }
}
