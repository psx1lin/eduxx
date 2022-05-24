import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin, Subscription } from 'rxjs';
import { DrEduPoint } from '../Modals/edu.interface';
import { OAEmp } from '../Modals/oa.interface';
import { LocalService } from '../services/local.service';
import { MissionService } from '../services/mission.service';
import { MyService } from '../services/service.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  msg_title = '查詢資訊';
  display = false;
  oaemp: OAEmp = {};

  drEduPoints: DrEduPoint[] = [];
  cols: any[] = [];
  totalPoint = 0;
  loading: boolean = true;
  secu = '0';


  mission = '<no mission announced>';
  confirmed = false;
  announced = false;
  subscription: Subscription;


  constructor(private myService: MyService,
    private router: Router,
    private localService: LocalService,
    private messageService: MessageService,
    private missionService: MissionService) {

    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
      });
  }

  ngOnInit(): void {
    this.confirmed = true;
    this.missionService.confirmMission('query');

    this.loading = false;
    this.cols = [
      { field: 'no', header: '編號' },
      { field: 'seqno', header: '序號' },
      { field: 'dept_promote', header: '晉升科別代碼' },
      { field: 'dept', header: '科別' },
      { field: 'dr', header: '醫師代號' },
      { field: 'drname', header: '姓名' },
      { field: 'year', header: '年份', format: 'cust-year' },
      { field: 'point', header: '分數' },
      { field: 'SYS__SEQ', header: 'idx' },
    ];

    this.oaemp = JSON.parse(this.localService.oAEmp);
    if (this.oaemp.empno !== null) {
      this.secu = this.oaemp.secu!;
      this.getDatas(this.oaemp);
    } else {
      this.router.navigate(['login']);
    }
  }

  getDatas(oAEmp: OAEmp) {
    this.totalPoint = 0;
    const method = 'Get_getdrpoint';
    let msg = '';
    let obs$ = this.myService.Get_getdrpoint(oAEmp);
    if (oAEmp.secu! >= "5"){
      obs$= this.myService.Get_edudrpoint();
    } 
    this.display=true;
    obs$.subscribe({
      next: data => {
        this.drEduPoints = data as DrEduPoint[];
        //  console.log(this.drEduPoints);
      },
      complete: () => {
        this.display=false;

        if (this.drEduPoints) {
          const aa = this.drEduPoints.map(x => x.point);
          if (aa.length > 0){
            this.totalPoint = aa.reduce((acc, cur) => (acc ? acc : 0) + (cur ? cur : 0)) as number;
          }
        }
      },
      error: (err) =>{
        this.display=false;
        console.log(err)
      } 
    });

    // forkJoin(['obs$']).subscribe({
    //   next: data => {
    //           debugger
    //           console.log(`QueryComponent:Get_getdrpoint->${data[0]}` );
    //   },
    //   complete: () => {
    //     console.log(`QueryComponent:Get_getdrpoint complete->` );
    //   },
    //   error: (err) => {
    //     msg = `錯誤 ${method}:${err}`;
    //     this.messageService.add({severity:'error', summary: this.msg_title , detail:msg});
    //   }     
    // })

  }

}
