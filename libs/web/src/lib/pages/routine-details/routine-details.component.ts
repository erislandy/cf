import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTabsComponent, TabItem } from '@cf/shared';
import { SvgLoaderComponent } from '@cf/shared';

@Component({
  selector: 'cf-routine-details',
  standalone: true,
  imports: [CommonModule, CustomTabsComponent, SvgLoaderComponent],
  templateUrl: './routine-details.component.html',
  styleUrl: './routine-details.component.scss',
})
export class RoutineDetailsComponent {
  routineSteps: Array<TabItem> = [
    {
      title: 'Information',
      featherIcon: 'info',
      subTitle: 'Info and conditions',
    },
    {
      title: 'Triggers',
      featherIcon: 'git-branch',
      subTitle: 'Sensor setpoint',
    },
    {
      title: 'Actions',
      featherIcon: 'git-merge',
      subTitle: 'Actuator commands',
    },
    {
      title: 'Notifictions',
      featherIcon: 'bell',
      subTitle: 'Email, SMS and Push',
    }

  ]
  infoFields: Array

  onTabsChanged(selectedTabIndex: number) {
    console.log({selectedTab: this.routineSteps[selectedTabIndex]});
  }
}
