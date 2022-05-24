import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { OAEmp } from './Modals/oa.interface';
import { LocalService } from './services/local.service';
import { MissionService } from './services/mission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterContentInit,AfterViewInit {
  title = '醫師點數';
  isShowMenu = false;
  oaemp: OAEmp = {
    empno: ''
  };

  @ViewChild(MenuComponent)
  private _menuComponent!: MenuComponent;


  constructor(private missionService: MissionService,
              private localService: LocalService){
   
  }

  ngOnInit(): void {
    this.missionService.missionConfirmed$.subscribe(
      astronaut => {
        console.log(`AppComponent OnInit : ${astronaut} confirmed the mission`);
        this.isShowMenu = true;
        this._menuComponent.isShow = true;
        if (astronaut === 'login'){          
          this._menuComponent.isShow = false;
        } else {
          this.oaemp = JSON.parse(this.localService.oAEmp);
          this._menuComponent.oaemp = this.oaemp;
        }
      });
  }

  ngAfterContentInit(): void {
    console.log(`AppComponent AfterContentInit : ${this.isShowMenu} `);
  } 

  ngAfterViewInit(): void {
    console.log(`AppComponent AfterViewInit : ${this.isShowMenu} `);

  }

}
