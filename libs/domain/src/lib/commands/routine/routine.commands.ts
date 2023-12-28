import { EntityType } from "../../generic";
import { RoutineEntity,  defaultNotification,  generateDefaultCondition, getDeviceInRoutine, updateTriggerState } from "../../models";
import { EmptyRoutine } from "../../models";

export const changeStateCommand = (params : {isEnabled: boolean}, routine: RoutineEntity) => {
    routine.isEnabled = params.isEnabled;
    return routine;
}

export const createRoutineCommand = () => {
    return new EmptyRoutine();
}

export const getRoutineByNameCommand = (params : {name: string, routines: Array<RoutineEntity>}) => {
    return params.routines.find(routine => routine.name.trim().toLocaleLowerCase() === params.name.trim().toLocaleLowerCase());
}
export const setDeviceParamsCommand = (
    params : {
        name: string,
        condition: string, 
        value: Array<number>,
        sensors: Array<any>,
        actuators: Array<any>
        type: "sensor" | "actuator",
    }, 
    routine: RoutineEntity) => {
        const devices = params.type === "sensor" ? params.sensors : params.actuators;
        const device = devices.find(device => device.name.trim().toLocaleLowerCase() === params.name.trim().toLocaleLowerCase());
        if(device){
            let trigger = getDeviceInRoutine(device, routine);
            if(!trigger){
                trigger = {
                    device: !device.isGroup ? device : undefined,
                    group: device.isGroup ? device : undefined,
                    isGroup: device.isGroup,
                    entityType: params.type === "sensor" ? EntityType.SENSOR : EntityType.ACTUATOR,
                    triggerState: {}
                };
                routine.triggers.push(trigger);
            }
            updateTriggerState(trigger, params);
        }
        return routine;
}

export const setIntervalCommand = (params : {dateIni: number, dateEnd: number},  routine: RoutineEntity ) => {
    if (!routine.condition) {      
        routine.condition = generateDefaultCondition();
      }
      
      routine.condition.activatedBetween = params;
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




