import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ReplacePipe } from './custom-pipes.pipe';

import { AppComponent } from './app.component';
import { LuJsonService } from './lu-json.service';
import { ZonesComponent } from './zones/zones.component';
import { ZoneDetailComponent } from './zone-detail/zone-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GithubSpaComponent } from './github-spa/github-spa.component';
import { AccDefaultLocComponent } from './acc-default-loc/acc-default-loc.component';



@NgModule({
  declarations: [
    AppComponent,
    ZonesComponent,
    ZoneDetailComponent,
    MessagesComponent,
    DashboardComponent,
    GithubSpaComponent,
    AccDefaultLocComponent,
    ReplacePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    LuJsonService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }