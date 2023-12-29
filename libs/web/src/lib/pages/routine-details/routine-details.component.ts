import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandExecutor, CustomTabsComponent, LocalCommandTypes, TabItem } from '@cf/shared';
import { SvgLoaderComponent } from '@cf/shared';
import { DataFieldCommand, routineTransform } from '../../ui-models';
import { DevicesComponent, SimpleDatafieldComponent } from '../../components';
import { GroupDatafieldComponent } from '../../components/group-datafield/group-datafield.component';
import { ActivatedRoute } from '@angular/router';
import {  ActuatorEntity, EmptyRoutine, EntityType, GenericUseCase, GroupEntity, RoutineEntity, RoutineFactory, commandType } from '@cf/domain';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription, combineLatest, filter, map, switchMap, tap } from 'rxjs';
import { SensorEntity } from '@cf/domain';

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
export class RoutineDetailsComponent implements OnInit, OnDestroy {
  

  //properties
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
  //Observables    
  _subs = new Subscription();

  //Services
  private route = inject(ActivatedRoute); 
  genericService = inject(GenericUseCase<RoutineEntity>);
  commandExecutor = inject(CommandExecutor);
  factory = inject(RoutineFactory);
  
  //Simple signals
  loading = signal(true);
  selectedIndex = signal(0);
  selectedRoutine = toSignal(this.factory.getRoutine());
  
  //Complex signals 
  devices = toSignal<Array<SensorEntity | ActuatorEntity | GroupEntity>>(combineLatest([
    this.genericService.getGenerics(EntityType.SENSOR, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be'),
    this.genericService.getGenerics(EntityType.ACTUATOR, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be'),
    this.genericService.getGenerics(EntityType.GROUP_TYPE, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be')    
  ]).pipe(
    map(([sensors, actuators, groups]) => sensors.concat(actuators).concat(groups)),
    tap(() => this.loading.set(false))));

  sensors = computed(() => this.devices()?.filter(d => 
      d.entityType === EntityType.SENSOR ||  
      (d.entityType === EntityType.GROUP_TYPE && 
       (d as GroupEntity).type.deviceType === 'sensor')
      ).map(d => ({
      id: d.id as string,
      name: d.name as string,
      nodeRedId: (d as SensorEntity).nodeRedId ?? '',
      selected: false
    })) ?? []);
    actuators = computed(() => this.devices()?.filter(d => 
      d.entityType === EntityType.ACTUATOR ||  
      (d.entityType === EntityType.GROUP_TYPE && 
       (d as GroupEntity).type.deviceType === 'actuator')
      ).map(d => ({
      id: d.id as string,
      name: d.name as string,
      nodeRedId: (d as ActuatorEntity).nodeRedId ?? '',
      selected: false
    })) ?? []);
    
  routineFields = computed<Array<{
    key: string;
    title: string;
    tabContent: Array<DataFieldCommand>;
  }>>(() => {
     return [
      {
        key: 'info',
        title: 'Information',
        tabContent: routineTransform('info', this.selectedRoutine() ?? new EmptyRoutine()),
      },
      {
        key: 'trigger',
        title: 'Triggers',
        tabContent: routineTransform('trigger', this.selectedRoutine() ?? new EmptyRoutine()),
      },
      {
        key: 'action',
        title: 'Actions',
        tabContent: routineTransform('action', this.selectedRoutine() ?? new EmptyRoutine()),
      },
      {
        key: 'notification',
        title: 'Notification',
        tabContent: routineTransform('notification', this.selectedRoutine() ?? new EmptyRoutine())
      },
    ];
  });
  public currentTab = computed(() => this.routineFields()[this.selectedIndex()]);

  public selectedSensors = computed(() => this.selectedRoutine()?.triggers.map((t: any) => {
    return t.isGroup && t.group ? t.group.id : t.device?.id ?? '';
  }));

  public selectedActuators = computed(() => this.selectedRoutine()?.actions.map((a: any) => {
    return a.isGroup && a.group ? a.group.id : a.device?.id ?? '';
  }));

  ngOnInit() {
    this._subs.add(this.commandExecutor.externalCommand$.pipe(
      filter((command: LocalCommandTypes | undefined) => command === LocalCommandTypes.BACK || command === LocalCommandTypes.NEXT))
      .subscribe((command) => {
        if(command === LocalCommandTypes.BACK){
          this.selectedIndex.update((value) => value <= 0 ? 0 : value - 1);
        }
        if(command === LocalCommandTypes.NEXT){
          this.selectedIndex.update((value) => value >= 3 ? 3 : value + 1);
        }
    }));
    this._subs.add(this.commandExecutor.requestCommand$.pipe(
      filter(event => event != null && event.trim() !== ''),
      switchMap((event) => this.genericService.processCommand(event))
    ).subscribe(response => {
          
      if(response.functionName ===  commandType.SET_NAME){
        if('name' in response.parameters){
          const name = response.parameters.name as string;          
          if(!name || name.trim() === ''){
            return this.commandExecutor.status$.next('error');
          }
     
          return this.commandExecutor.status$.next('success');
        }     
        return this.commandExecutor.status$.next('error');
        
      }
    }));
  }
  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  //Methods
  onTabsChanged(selectedTabIndex: number) {
    this.selectedIndex.set(selectedTabIndex);
  }
}
