import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { ScheduleCalendarComponent } from './components/schedule-calender/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { SharedModule } from "../shared/shared.module";

export const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleControlsComponent,
        ScheduleDaysComponent,
        ScheduleAssignComponent,
        ScheduleSectionComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ]
})
export class ScheduleModule {}