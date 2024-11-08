import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { TaskPopupComponent } from './pages/task-popup/task-popup.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    TaskPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
