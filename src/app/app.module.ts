import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { MyPlanComponent } from './my-plan/my-plan.component';
import { ManageDutiesComponent } from './manage-duties/manage-duties.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DutiesService } from './shared/services/duties.service';
import { ValidateCalendarDirective } from './directives/validate-calendar.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyPlanComponent,
    ManageDutiesComponent,
    ValidateCalendarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    TabMenuModule,
    TabViewModule,
    CardModule,
    TableModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputNumberModule
  ],
  providers: [DutiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
