import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTabsComponent, TabItem, VoiceManagerComponent } from '@cf/shared';
import { SvgLoaderComponent } from '@cf/shared';
import { DataFieldCommand } from '../../ui-models';
import { DevicesComponent, SimpleDatafieldComponent } from '../../components';
import { GroupDatafieldComponent } from '../../components/group-datafield/group-datafield.component';
import { actuators, getInitialData, sensors } from './mock-data';

@Component({
  selector: 'cf-routine-details',
  standalone: true,
  imports: [
    CommonModule, 
    CustomTabsComponent, 
    SvgLoaderComponent,
    SimpleDatafieldComponent,
    GroupDatafieldComponent,
    DevicesComponent
  ],
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
      title: 'Notifications',
      featherIcon: 'bell',
      subTitle: 'Email, SMS and Push',
    },
  ];
  infoFields: Array<DataFieldCommand>;
  triggerFields: Array<DataFieldCommand>;
  actionFields: Array<DataFieldCommand>;
  notificationFields: Array<DataFieldCommand>;

  routineFields: Array<{
    key: string;
    title: string;
    tabContent: Array<DataFieldCommand>
  }>;
  currentTab: {
    key: string;
    title: string;
    tabContent: Array<DataFieldCommand>
  };
  sensors: Array<{
    id: string;
    nodeRedId: string;
    name: string;
    selected: boolean;
  }> = [];
  actuators: Array<{
    id: string;
    nodeRedId: string;
    name: string;
    selected: boolean;
  }> = [];

  constructor() {
    const data = getInitialData();
    this.infoFields =  data.infoFields as DataFieldCommand[];
    this.triggerFields = data.triggerFields as DataFieldCommand[];
    this.actionFields = data.actionFields as DataFieldCommand[];
    this.notificationFields = data.notificationFields as DataFieldCommand[];
    this.routineFields = [
      {
        key: 'info',
        title: 'Information',
        tabContent: this.infoFields
      },
      {
        key: 'trigger',
        title: 'Triggers',
        tabContent: this.triggerFields
      },
      {
        key: 'action',
        title: 'Actions',
        tabContent: this.actionFields
      },
      {
        key: 'notification',
        title: 'Notification',
        tabContent: this.notificationFields
      },
    ]
    this.currentTab = this.routineFields[0];
    this.sensors = sensors;
    this.actuators = actuators;
  }

  onTabsChanged(selectedTabIndex: number) {
    this.currentTab = this.routineFields[selectedTabIndex];
  }
}
