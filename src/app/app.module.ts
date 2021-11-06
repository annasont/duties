import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import {TabMenuModule} from 'primeng/tabmenu';
import { MyPlanComponent } from './my-plan/my-plan.component';
import { ManageDutiesComponent } from './manage-duties/manage-duties.component';

@NgModule({
  declarations: [
    AppComponent,
    MyPlanComponent,
    ManageDutiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TabMenuModule,
    TabViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
