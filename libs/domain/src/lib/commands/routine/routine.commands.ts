import { EntityType } from "../../generic";
import { DeviceCommonEntity, GroupEntity, RoutineEntity,  defaultNotification,  generateDefaultCondition, getDeviceInRoutine, updateTriggerState } from "../../models";
import { EmptyRoutine } from "../../models";
import Fuse from 'fuse.js';

export const sum = (a: number, b: number) => a + b;

export const changeStateCommand = (params : {isEnabled: boolean}, routine: RoutineEntity) => {
    routine.isEnabled = params.isEnabled;
    return routine;
}

export const createRoutineCommand = () => {
    return new EmptyRoutine();
}

export const getRoutineByNameCommand = (params : {name: string, routines: Array<RoutineEntity>}) => {
    const name = params.name as string;    
    console.log("line 17 params", params );
    const options = {
      includeScore: true,
      keys: ['name']
    }
    const routineExpected = new Fuse<RoutineEntity>(params.routines, options).search(name)[0];
    if(!routineExpected){
        throw new Error("Routine not found");
    }
    return routineExpected.item;
}
export const setDeviceParamsCommand = (
    //eslint-ignore 
    
    params : {
        name: string,
        condition: string, 
        value: Array<number>,
        sensors: Array<any>,
        actuators: Array<any>
        type: string,
    }, 
    routine: RoutineEntity) => {
        const devices = params.type === "sensor" ? params.sensors : params.actuators;
        const options = {
            includeScore: true,
            keys: ['name']
          }
          const deviceExpected = new Fuse<any>(devices, options).search(params.name)[0];
          //const deviceExpected = {item: params.actuators[4]};
          if(!deviceExpected){
              throw new Error("Device not found");
          }
          const device = deviceExpected.item;       
        if(device){
            let trigger = getDeviceInRoutine(device, routine, params.type);
            if(!trigger){
                const group = device as GroupEntity;
                const isGroup = group && group.devices && group.devices.length > 0;
                trigger = {
                    device: !isGroup ? device : undefined,
                    group: isGroup ? device as GroupEntity: undefined,
                    isGroup: isGroup,
                    entityType: params.type === "sensor" ? EntityType.SENSOR : EntityType.ACTUATOR,
                    triggerState: {}
                };
                trigger.entityType === EntityType.SENSOR 
                ? routine.triggers.push(trigger)
                : routine.actions.push(trigger);
            }
            updateTriggerState(trigger, params);
        }
        return routine;
}

export const setIntervalCommand = (params : {dateIni: number, dateEnd: number},  routine: RoutineEntity ) => {
    const now = new Date();
    const cleanNow = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
    if (!routine.condition) {      
        routine.condition = generateDefaultCondition();
      }
      
      routine.condition.activatedBetween = {
        dateIni: params.dateIni + cleanNow,
        dateEnd: params.dateEnd + cleanNow,
      };
      return routine;
}

export const setNameCommand = (params : {name: string}, routine: RoutineEntity) => {
    routine.name = params.name;
    return routine;
}
export const setRepetitionDaysCommand = (params : {activeDays: Array<number>}, routine: RoutineEntity) => {
    if (!routine.condition) {      
        routine.condition = generateDefaultCondition();
      }
      
      routine.condition.activeDays = params.activeDays;
      return routine;
}
export const setSupressForCommand = (params : {supressFor: number}, routine: RoutineEntity) => {
    if (!routine.condition) {      
        routine.condition = generateDefaultCondition();
    }      
    routine.condition.suppressFor = params.supressFor;
    return routine;
}

export const setNotificationMessageCommand = (params : {message: string}, routine: RoutineEntity) => {
    if(!routine.notification) routine.notification = defaultNotification();
    routine.notification.notificationMessage = params.message;
    return routine;
}

export const setNotificationTypeCommand = (params : {type: "Push" | "Email" | "SMS"}, routine: RoutineEntity) => {
    if(!routine.notification) routine.notification = defaultNotification();
    routine.notification.type = params.type;
    return routine;
}
export const setNotificationActivatedCommand = (params : {isActivated: boolean}, routine: RoutineEntity) => {
    if(!routine.notification) routine.notification = defaultNotification();
    routine.notification.isActivated = params.isActivated;
    return routine;
}




