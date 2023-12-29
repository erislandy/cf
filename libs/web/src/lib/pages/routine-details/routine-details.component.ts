import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTabsComponent, TabItem } from '@cf/shared';
import { SvgLoaderComponent } from '@cf/shared';
import { DataFieldCommand, routineTransform } from '../../ui-models';
import { DevicesComponent, SimpleDatafieldComponent } from '../../components';
import { GroupDatafieldComponent } from '../../components/group-datafield/group-datafield.component';
import { actuators, sensors } from './mock-data';
import { ActivatedRoute } from '@angular/router';
import {  EntityType, GenericUseCase, RoutineEntity } from '@cf/domain';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

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
  genericService = inject(GenericUseCase<RoutineEntity>);
  loading = signal(true);
  currentRoutine = toSignal(
    this.route.params.pipe(
      switchMap(({id}) => this.genericService.getOneGeneric(id,EntityType.ROUTINE, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be')),
      tap((data) => {        
          console.log({data});
          this.loading.set(false);          
      }))
  );
  
  public selectedIndex = signal(0);
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

  public selectedSensors = computed(() => this.currentRoutine().triggers.map((t: any) => {
    return t.isGroup && t.group ? t.group.id : t.device?.id ?? '';
  }));

  public selectedActuators = computed(() => this.currentRoutine().actions.map((a: any) => {
    return a.isGroup && a.group ? a.group.id : a.device?.id ?? '';
  }));


  constructor() {
    this.sensors = sensors;
    this.actuators = actuators; 
   }  

  onTabsChanged(selectedTabIndex: number) {
    this.selectedIndex.set(selectedTabIndex);
  }
}
