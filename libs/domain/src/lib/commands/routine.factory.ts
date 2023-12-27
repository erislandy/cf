import { Injectable } from "@angular/core";
import { setIntervalCommand, changeStateCommand, createRoutineCommand, getRoutineByNameCommand, setDeviceParamsCommand, setNameCommand, setNotificationActivatedCommand, setNotificationMessageCommand, setNotificationTypeCommand, setRepetitionDaysCommand, setSupressForCommand } from "./routine/routine.commands";
import { RoutineEntity } from "../models";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class RoutineFactory {
    private routineSelected$ = new BehaviorSubject<RoutineEntity | undefined>(undefined);
    commands = {
        "change-state": changeStateCommand,
        "create-routine": createRoutineCommand,
        "get-routine-by-name": getRoutineByNameCommand,
        "set-device-params": setDeviceParamsCommand,
        "set-repetition-days": setRepetitionDaysCommand,
        "set-supress-for": setSupressForCommand,
        "set-notification-message": setNotificationMessageCommand,
        "set-notification-type": setNotificationTypeCommand,
        "set-notification-state": setNotificationActivatedCommand,
        "set-name": setNameCommand,
        "set-interval": setIntervalCommand
    }
    execute(command: commandType, params: any, routine: RoutineEntity) {
        this.commands[command](params, routine);
        this.routineSelected$.next(routine);
    }
    getRoutine(): Observable<RoutineEntity | undefined> {
      return this.routineSelected$.asObservable();
    }
  }

  export enum commandType {
    CHANGE_STATE = "change-state",
    CREATE_ROUTINE = "create-routine",
    GET_ROUTINE_BY_NAME = "get-routine-by-name",
    SET_DEVICE_PARAMS = "set-device-params",
    SET_REPETITION_DAYS = "set-repetition-days",
    SET_SUPRESS_FOR = "set-supress-for",
    SET_NOTIFICATION_MESSAGE = "set-notification-message",
    SET_NOTIFICATION_TYPE = "set-notification-type",
    SET_NOTIFICATION_STATE = "set-notification-state",
    SET_NAME = "set-name",
    SET_INTERVAL = "set-interval" 
    
  }