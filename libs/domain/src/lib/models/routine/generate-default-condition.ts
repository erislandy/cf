import { BooleanOptionsDevice, RangeOptionsDevice } from "../group-device";
import { RoutineEntity, RoutineNotificationType, RoutineParamType } from "./routine.entity";

export const generateDefaultCondition = ()  => {
    const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );

      return {
        activated: true,
        activeDays: [0, 1, 2, 3, 4, 5, 6],
        activatedBetween: {
          dateEnd: todayEnd.getTime(),
          dateIni: today.getTime(),
        },
        suppressFor: 5,
      };
}

export const  getDeviceInRoutine = (el: any, routine: RoutineEntity) :  RoutineParamType | undefined => {
  const deviceType = el.isGroup ? el.devices[0].deviceType : el.deviceType;
  const triggers = deviceType === "sensor" ? routine.triggers : routine.actions;
  return triggers.find(trigger => trigger.device?.id === el.id || trigger.group?.id === el.id);
}

export const  updateTriggerState = (trigger: RoutineParamType, params: {condition: string, value: Array<number>}) => {
  if(trigger.device){
      const options = trigger.device?.deviceData?.group?.options as BooleanOptionsDevice;
      if(options instanceof BooleanOptionsDevice){
          trigger['triggerState'] = {
              mode: params.condition === "OFF" ? 1 : 0,
              description: getBooleanDescription(trigger, params.condition)
          }
          trigger.triggerState.description = getBooleanDescription(trigger, params.condition);
      }
      if(options instanceof RangeOptionsDevice){
          trigger['triggerState'] = {
              minValueInterval: params.value[0],
              maxValueInterval: params.value[1],
              whenItemSelected: params.condition,
              scaleItemSelected: options.scale,
              description: getRangeDescription(trigger,params)
          }
      }
  }    
}

export const  getBooleanDescription = (newTrigger: RoutineParamType, condition: string): string => {
  const options = newTrigger.device?.deviceData?.group?.options as BooleanOptionsDevice;
  const lblActive = condition === "OFF" ? options.lblFirstMode : options.lblSecondMode;
  return `${newTrigger?.device?.name || newTrigger.group?.name
    } is ${lblActive}`;
}

export const  getRangeDescription = (newTrigger: RoutineParamType, params: {condition: string, value: Array<number>}): string => {
  const value = params.value[0]
  const description =
    newTrigger.triggerState.whenItemSelected === 'Between'
      ? `${newTrigger.device?.name || newTrigger.group?.name
      } is ${newTrigger.triggerState.whenItemSelected?.toLocaleLowerCase()} ${newTrigger.triggerState.minValueInterval
      } and ${newTrigger.triggerState.maxValueInterval} ${newTrigger.triggerState.scaleItemSelected
      }`
      : `${newTrigger.device?.name || newTrigger.group?.name
      } is ${newTrigger.triggerState.whenItemSelected?.toLocaleLowerCase()} ${value} ${newTrigger.triggerState.scaleItemSelected}`;
  return description;
}

export const defaultNotification = () => {
  const notification: RoutineNotificationType =   {
    isActivated: false, 
    notificationMessage: '',
    type: "Push"
  }
  return notification;
}