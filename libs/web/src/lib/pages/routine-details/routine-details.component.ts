import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTabsComponent, TabItem } from '@cf/shared';
import { SvgLoaderComponent } from '@cf/shared';
import { DataFieldCommand, routineTransform } from '../../ui-models';
import { DevicesComponent, SimpleDatafieldComponent } from '../../components';
import { GroupDatafieldComponent } from '../../components/group-datafield/group-datafield.component';
import { actuators, sensors } from './mock-data';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { routines } from './mock-data';
import { EmptyRoutine, RoutineEntity } from '@cf/domain';

@Component({
  selector: 'cf-routine-details',
  standalone: true,
  imports: [
    CommonModule,
    CustomTabsComponent,
    SvgLoaderComponent,
    SimpleDatafieldComponent,
    GroupDatafieldComponent,
    DevicesComponent,
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
  
  private route = inject(ActivatedRoute); 
  
  public selectedIndex = signal(0);
  public currentRoutine = signal<RoutineEntity>(new EmptyRoutine());

  public routineFields = computed<Array<{
    key: string;
    title: string;
    tabContent: Array<DataFieldCommand>;
  }>>(() => {
     return [
      {
        key: 'info',
        title: 'Information',
        tabContent: routineTransform('info', this.currentRoutine()),
      },
      {
        key: 'trigger',
        title: 'Triggers',
        tabContent: routineTransform('trigger', this.currentRoutine()),
      },
      {
        key: 'action',
        title: 'Actions',
        tabContent: routineTransform('action', this.currentRoutine()),
      },
      {
        key: 'notification',
        title: 'Notification',
        tabContent: routineTransform('notification', this.currentRoutine())
      },
    ];
  });
  public currentTab = computed(() => this.routineFields()[this.selectedIndex()]);

  public selectedSensors = computed(() => this.currentRoutine().triggers.map((t) => {
    return t.isGroup && t.group ? t.group.id : t.device?.id ?? '';
  }));

  public selectedActuators = computed(() => this.currentRoutine().actions.map((a) => {
    return a.isGroup && a.group ? a.group.id : a.device?.id ?? '';
  }));


  constructor() {
    this.sensors = sensors;
    this.actuators = actuators;    
    this.route.params.pipe(
      switchMap(({id}) => {
        const routine =
          routines.find((r) => r.id === id) || new EmptyRoutine();
        return of(routine as RoutineEntity);
      })).subscribe((routine) => this.currentRoutine.set(routine));
  }  

  onTabsChanged(selectedTabIndex: number) {
    this.selectedIndex.set(selectedTabIndex);
  }
}
