import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { OAEmp } from '../Modals/oa.interface';
import { MyService } from '../services/service.service';

import { PrimeNGConfig } from 'primeng/api';
import { MissionService } from '../services/mission.service';
import { LocalService } from '../services/local.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msgs1: Message[] = [];
  display = false;
  empno: string ='';
  pd: string = '';
  oaemp: OAEmp = {
    empno: ''
  };

  mission = '<no mission announced>';
  confirmed = false;
  announced = false;
  subscription: Subscription;

  constructor(private myService: MyService,
              private localService: LocalService,
              private router: Router,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private missionService: MissionService ) {

                this.subscription = missionService.missionAnnounced$.subscribe(
                  mission => {
                    this.mission = mission;
                    this.announced = true;
                    this.confirmed = false;
                });

               }

  ngOnInit(): void {
    localStorage.clear();
    this.primengConfig.ripple = true;
    this.confirmed = true;
    this.missionService.confirmMission('login');
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  doLogin()  {
    let isOk = false;
    let msg = '';
    let msg_title = '登入資訊:';
    this.oaemp.empno= this.empno;
    this.oaemp.pd=this.pd;
    this.display = true;
    var obs$ = this.myService.Get_empinfo(this.oaemp);
    forkJoin([obs$]).subscribe({
      next: data=> {       
        if (data.length > 0 ) {
          this.oaemp =  data[0] as OAEmp;
          if (this.oaemp.pd === 'true') {
             isOk = true;
          } 
        } 
      },
      complete:()=>{
        this.display = false;
        if (isOk){
          // this.localService.Empno 
          this.localService.LocalClear();
          this.localService.oAEmp = JSON.stringify(this.oaemp);          
           console.log(`login-1:${JSON.parse(this.localService.oAEmp)}`);
          this.confirmed = true;
          this.missionService.confirmMission('query');
          this.router.navigate(['query']);
        } else{
          msg= '登入錯誤!!';
          this.localService.LocalClear();
          this.messageService.add({severity:'error', summary: msg_title , detail:msg});
        }
      },
      error: (err)=> {
        this.display = false;
        console.log(`error:${err}`)
        this.localService.LocalClear();
        msg = err;
        this.messageService.add({severity:'error', summary: msg_title , detail:msg});
      }
    });

    // obs$.subscribe(res => {
    //     isOk = Boolean(res);
    //     if (isOk){
    //       this.router.navigate(['query']);
    //     }
    // }, error => {
      
    // });
  }

  showViaService() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
}

}
