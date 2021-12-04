import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
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
import { DutiesListComponent } from './manage-duties/duties-list/duties-list.component';
import { DutyDetailsComponent } from './manage-duties/duty-details/duty-details.component';
import { AccordionModule } from 'primeng/accordion';
import { ApiService } from './shared/services/api.service';
import { WeeklyListComponent } from './my-plan/weekly-list/weekly-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MyPlanComponent,
    ManageDutiesComponent,
    DutiesListComponent,
    DutyDetailsComponent,
    WeeklyListComponent,
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
    InputNumberModule,
    HttpClientModule,
    AccordionModule,
  ],
  providers: [
    DutiesService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
