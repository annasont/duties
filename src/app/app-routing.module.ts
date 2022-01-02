import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDutiesComponent } from './manage-duties/manage-duties.component';
import { MyPlanComponent } from './my-plan/my-plan.component';


const routes: Routes = [
  { path: '', redirectTo: '/my-plan', pathMatch: 'full' },
  { path: 'my-plan', component: MyPlanComponent },
  { path: 'manage-duties', component: ManageDutiesComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
