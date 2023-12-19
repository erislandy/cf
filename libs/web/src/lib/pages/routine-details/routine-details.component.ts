import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTabsComponent, TabItem } from '@cf/shared';

@Component({
  selector: 'cf-routine-details',
  standalone: true,
  imports: [CommonModule, CustomTabsComponent],
  templateUrl: './routine-details.component.html',
  styleUrl: './routine-details.component.scss',
})
export class RoutineDetailsComponent {
  routineSteps: Array<TabItem> = [
    {
      title: 'Information',
      featherIcon: 'info',
      subTitle: 'Add info and conditions',
    },
    {
      title: 'Triggers',
      featherIcon: 'git-branch',
      subTitle: 'Simple/Groups of sensors',
    },
    {
      title: 'Actions',
      featherIcon: 'git-merge',
      subTitle: 'Simple/Groups of actuators',
    },
    {
      title: 'Notifictions',
      featherIcon: 'bell',
      subTitle: 'Email, SMS and Push',
    }

  ]

  onTabsChanged(selectedTabIndex: number) {
    console.log({selectedTab: this.routineSteps[selectedTabIndex]});
  }
}
