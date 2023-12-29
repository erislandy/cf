import { EmptyRoutine, RoutineEntity, RoutineParamType } from "@cf/domain";
import { DataFieldCommand } from "./data-field-command.model";

export const routineTransform = (
    options: "info" | "trigger" | "action" | "notification",
    routineExpected: RoutineEntity) : DataFieldCommand[] => {
      const routine = routineExpected ?? new EmptyRoutine();

        const transformer = {
            info: () => {
                return [
                    {
                      command: 'set-name',
                      required: true,
                      label: 'Name: ',
                      value: routine.name,
                      state: 'valid',
                      type: "simple"
                    },
                    {
                      command: 'set-enabled',
                      required: true,
                      label: 'State: ',
                      value: routine.isEnabled ? 'Active' : 'Disabled',
                      state: 'valid',
                      type: "simple"
                    },
                    {
                      command: 'set-repetition-days',
                      required: false,
                      label: 'Active Days: ',
                      value: routine.condition 
                                ? getDays(routine.condition.activeDays) : 'None',
                      state: 'invalid',
                      type: "simple"
                    },
                    {
                      command: 'set-interval',
                      required: false,
                      label: 'Interval: ',
                      value: routine.condition ? getInterval(routine.condition.activatedBetween) : 'None',
                      state: 'pending',
                      type: "simple"
                    },
                    {
                      command: 'set-supress-for',
                      required: false,
                      label: 'Supress for: ',
                      value:  routine.condition ?  routine.condition.suppressFor + ' minutes': '5 minutes',
                      state: 'disabled',
                      type: "simple"
                    },
                ];
            },
            trigger: () => [
                {
                    command: 'trigger-settings',
                    required: false,
                    label: 'Trigger settings: ',
                    type: 'group',
                    value: getTriggerDescription(routine.triggers),//['Temperature Z1 above 50F', 'Humidity Z1 above 80%'],
                    state: 'valid',
                  },
            ],
            action: () => [
                {
                    command: 'action-settings',
                    required: false,
                    label: 'Action settings: ',
                    type: 'group',
                    value: getTriggerDescription(routine.actions),//['Temperature Z1 above 50F', 'Humidity Z1 above 80%'],
                    state: 'valid',
                  },
            ],
            notification: () => [
                {
                    command: 'enable-notification',
                    required: false,
                    label: 'State: ',
                    type: 'simple',
                    value: routine.notification && routine.notification.isActivated ? 'Active' : 'Disabled',
                    state: 'valid',
                  },
                  {
                    command: 'set-notification',
                    required: false,
                    label: 'Email notification: ',
                    type: 'group',
                    value: ['Push notifications', 'Email notifications', 'SMS notifications'],
                    state: 'valid',
                }
            ]
        }
        return transformer[options] ? transformer[options]() : [];
    
};

function getDays(activeDays: Array<number>): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return activeDays.map(d => days[d]).join(', ');
}

function getInterval(activatedBetween: {dateIni: number, dateEnd: number}): string {
    const ini = new Date(activatedBetween.dateIni);
    const end = new Date(activatedBetween.dateEnd);

    const getHoursFormat = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const hoursFormat = hours < 10 ? '0' + hours : hours;
        const meridian = hours < 12 ? 'AM' : 'PM';
        const minutesFormat = minutes < 10 ? '0' + minutes : minutes;
        return `${hoursFormat}:${minutesFormat} ${meridian}`;
    };
    const iniHours = getHoursFormat(ini);
    const endHours = getHoursFormat(end);
    return `${iniHours} - ${endHours}`;    
}

function getTriggerDescription(triggers: Array<RoutineParamType>): string [] {
    return triggers && triggers.length > 0 ? triggers.map(t => {
        return t.triggerState.description
    }) : [];
} 