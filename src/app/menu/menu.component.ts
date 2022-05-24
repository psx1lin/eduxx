import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { OAEmp } from '../Modals/oa.interface';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  dockItems: MenuItem[] = [];

  oaemp: OAEmp = {
    empno: ''
  };

  isShow = false;
  constructor(private router: Router,
    private confirmationService: ConfirmationService,
    private localService: LocalService,) { }

  ngOnInit(): void {
    this.items = [
      { label: '首頁', icon: 'pi pi-fw pi-home' },
      { label: '點數', icon: 'pi pi-fw pi-list' },
      { label: '認証', icon: 'pi pi-fw pi-bookmark' },
      { label: '點數規則', icon: 'pi pi-fw pi-question-circle' },
    ];
    this.dockItems = [
      {
        label: '首頁',
        icon: "assets/images/dock/home.svg",
        tooltip: '首頁',
        command: () => {
          this.router.navigate(['home']);
        }
      },
      {
        label: '點數',
        icon: "assets/images/dock/myPoint.svg",
        tooltip: '點數列表',
        command: () => {
          this.router.navigate(['query']);
        }
      },
      {
        label: '認証',
        icon: "assets/images/dock/bookmark.svg",
        tooltip: '認証列表',
        command: () => {
          this.router.navigate(['bookmark']);
        }
      },
      {
        label: '點數規則',
        icon: "assets/images/dock/pointRule.svg",
        tooltip: '點數規則',
        command: () => {
          this.router.navigate(['pointrule']);
        }
      },
      {
        label: '登出',
        icon: "assets/images/dock/logout.svg",
        tooltip: '登出',
        command: () => {
          this.confirmationService.confirm({
            message: '確定登出?',
            accept: () => {
              this.localService.LocalClear();
              this.router.navigate(['login']);
            }
          });
        }
      }
    ];

    this.oaemp = JSON.parse(this.localService.oAEmp);
    if (this.oaemp !== null) {
      if (this.oaemp.empno === 'undefined') {
        this.router.navigate(['login']);
      }
    } else {
      this.router.navigate(['login']);
    }

  }

}
