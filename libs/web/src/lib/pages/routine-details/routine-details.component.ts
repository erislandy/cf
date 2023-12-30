import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandExecutor, CustomTabsComponent, LocalCommandTypes, TabItem } from '@cf/shared';
import { SvgLoaderComponent } from '@cf/shared';
import { DataFieldCommand, routineTransform } from '../../ui-models';
import { DevicesComponent, SimpleDatafieldComponent } from '../../components';
import { GroupDatafieldComponent } from '../../components/group-datafield/group-datafield.component';
import { ActivatedRoute, Router } from '@angular/router';
import {  ActuatorEntity, DeviceEntity, EmptyRoutine, EntityType, GenericUseCase, GroupEntity, RoutineEntity, RoutineFactory, commandType } from '@cf/domain';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription, combineLatest, filter, map, switchMap, tap } from 'rxjs';
import { SensorEntity } from '@cf/domain';
import { group } from 'console';
import { mapFromRoutinesToDB } from '../../helpers/routine.mapper';

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
  router = inject(Router);
  
  //Simple signals
  loading = signal(true);
  selectedIndex = signal(0);
  selectedRoutine = signal(new EmptyRoutine());
  
  //Complex signals 
  mainData = toSignal<{
    sensors: Array<SensorEntity>, 
    actuators: Array<ActuatorEntity>,
    groups: Array<GroupEntity>,
    devices: Array<DeviceEntity>
  }>(combineLatest([
    this.genericService.getGenerics(EntityType.SENSOR, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be'),
    this.genericService.getGenerics(EntityType.ACTUATOR, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be'),
    this.genericService.getGenerics(EntityType.GROUP_TYPE, 'e563c6a6-b3d4-4eec-acd4-426d2b7615be'),
    this.genericService.getGenerics(EntityType.DEVICE)    
  ]).pipe(
      map(([sensors, actuators, groups, devices]) => ({sensors, actuators, groups, devices})),
      tap(() => this.loading.set(false)))
    );

  sensors = computed(() => this.mainData()?.sensors.map(s => 
      {
        const device = this.mainData()?.devices.find(d => s.deviceData && d.id === s.deviceData.id);
        return ({
          ...s,
          deviceData: device,
          selected: false
        });
      })
      .concat(this.mainData()?.groups.filter(g => g.type.deviceType === 'sensor')
                              .map(g => ({...g, name: `${g.name} (Group)`, selected: false})) as Array<any>)
  )
  actuators = computed(() => this.mainData()?.actuators.map(a => 
    {
      const device = this.mainData()?.devices.find(d => a.deviceData && d.id === a.deviceData.id);
      return ({
        ...a,
        deviceData: device,
        selected: false
      });
    })
    .concat(this.mainData()?.groups.filter(g => g.type.deviceType === 'actuator')
                            .map(g => ({...g, name: `${g.name} (Group)`, selected: false})) as Array<any>)
)


  routineFields = computed<Array<{
    key: string;
    title: string;
    tabContent: Array<DataFieldCommand>;
  }>>(() => {
    console.log("updating routine fields");
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
    this._subs.add(this.factory.getRoutine().subscribe(
      (routine) => this.selectedRoutine.set(routine)));

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
      const functionName = response.functionName.replace("functions.", "") as commandType;
      let parameters = response.parameters;
      if(functionName === commandType.SET_DEVICE_PARAMS){
        parameters = {
          ...parameters,
          sensors: this.sensors(), 
          actuators: this.actuators()
        }
        console.log("parameters", parameters);
      }
      try {
        this.factory.execute(functionName, parameters);
        return this.commandExecutor.status$.next('success');
      } catch (error) {
        this.commandExecutor.status$.next('error');
      }
    }));

    this._subs.add(this.commandExecutor.externalCommand$.pipe(
      filter((command: LocalCommandTypes | undefined) => command === LocalCommandTypes.SAVE),
      switchMap(() => {
        const routine = mapFromRoutinesToDB(this.selectedRoutine());
        return routine.id !== "new" 
        ? this.genericService.createGeneric(routine,"e563c6a6-b3d4-4eec-acd4-426d2b7615be")
        : this.genericService.updateGeneric(routine, "e563c6a6-b3d4-4eec-acd4-426d2b7615be")
      }))
      .subscribe(() => {
        this.router.navigate(['/']);
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
