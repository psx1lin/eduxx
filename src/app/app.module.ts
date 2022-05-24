import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QuitComponent } from './quit/quit.component';
import { ErrorComponent } from './error/error.component';
import { QueryComponent } from './query/query.component';


import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {TabMenuModule} from 'primeng/tabmenu';
import {DockModule} from 'primeng/dock';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';
import { MenuComponent } from './menu/menu.component';
import { MyService } from './services/service.service';
import { MissionService } from './services/mission.service';
import { HomeComponent } from './home/home.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { PointruleComponent } from './pointrule/pointrule.component';
import { LocalService } from './services/local.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuitComponent,
    ErrorComponent,
    QueryComponent,
    MenuComponent,
    HomeComponent,
    BookmarkComponent,
    PointruleComponent
  ],
  imports: [
    InputTextModule,
    ButtonModule,
    RippleModule,
    TabMenuModule,
    DockModule,
    TableModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [MessageService,ConfirmationService,MyService,MissionService,LocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
