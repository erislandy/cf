import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTabsComponent, TabItem, VoiceManagerComponent } from '@cf/shared';
import { SvgLoaderComponent } from '@cf/shared';
import { DataFieldCommand } from '../../ui-models';
import { SimpleDatafieldComponent } from '../../components';
import { GroupDatafieldComponent } from '../../components/group-datafield/group-datafield.component';

@Component({
  selector: 'cf-routine-details',
  standalone: true,
  imports: [
    CommonModule, 
    CustomTabsComponent, 
    SvgLoaderComponent,
    SimpleDatafieldComponent,
    GroupDatafieldComponent,
    VoiceManagerComponent
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
      title: 'Notifictions',
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

  constructor() {
    this.infoFields = [
      {
        command: 'set-name',
        required: true,
        label: 'Name: ',
        value: 'Routine 1',
        state: 'valid',
        type: 'simple'
      },
      {
        command: 'set-enabled',
        required: true,
        label: 'State: ',
        value: 'Active',
        state: 'valid',
        type: 'simple'
      },
      {
        command: 'set-repetition-days',
        required: false,
        label: 'Active Days: ',
        value: 'Mon, Tue, Sat, Sun',
        state: 'invalid',
        type: 'simple'
      },
      {
        command: 'set-interval',
        required: false,
        label: 'Interval: ',
        value: '8:00 AM to 9:00 AM',
        state: 'pending',
        type: 'simple'
      },
      {
        command: 'set-supress-for',
        required: false,
        label: 'Supress for: ',
        value: '5 minutes',
        state: 'disabled',
        type: 'simple'
      },
    ];
    this.triggerFields = [
      {
        command: 'trigger-settings',
        required: false,
        label: 'Trigger settings: ',
        type: 'group',
        value: ['Temperature zone-1 above 50F', 'Humidity above 80%'],
        state: 'valid',
      },
    ];
    this.actionFields = [
      {
        command: 'action-settings',
        required: false,
        label: 'Trigger settings: ',
        type: 'group',
        value: ['curtain z2 is Open', 'valve 1 zone 2 is On'],
        state: 'valid',
      },
    ];
    this.notificationFields = [
      {
        command: 'enable-notification',
        required: false,
        label: 'State: ',
        type: 'simple',
        value: 'Disabled',
        state: 'valid',
      },
      {
        command: 'set-notification',
        required: false,
        label: 'Email notification: ',
        type: 'group',
        value: ['Push notifications', 'Email notifications'],
        state: 'valid',
    }];
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
  }

  onTabsChanged(selectedTabIndex: number) {
    this.currentTab = this.routineFields[selectedTabIndex];
  }
}
