import {actuators, sensors} from "../mock"
import { 
  EmptyRoutine, 
  setNameCommand,
setDeviceParamsCommand, 
RoutineEntity} from "@cf/domain";

describe('DomainTestComponent', () => {

   it('update name of routine', () => {
    const routine = new EmptyRoutine();
    const params = {
      name: "Routine 43, House 4"
    };
    const result = setNameCommand(params, routine);
    expect(result.name).toEqual(params.name);
  });

  it('set sensor params. Range options and bellow operator', () => {
    const routine = new EmptyRoutine();
    const params = {
      "name": "temperatura 1",
      "condition": "Below",
      "value": [25],
      "type": "sensor",
      sensors,
      actuators
      
  };
    const result = setDeviceParamsCommand(params, routine);
    const trigger = result.triggers[0];
    const triggerState = trigger.triggerState;
    expect(result.triggers.length).toEqual(1);
    expect(trigger.device?.id).toEqual("d9fa30ee-59f0-4a68-bed4-da226650d7a8");
    expect(triggerState.description).toEqual("Temperature 1 is below 25 Fahrenheit");
    
  });
});
it('set sensor params. Boolean options and ON operator', () => {
  
  const routine: any = {
    "priority": 0,
    "name": "Test 3",
    "entityType": "routines",
    "notification": {
        "isActivated": false,
        "notificationMessage": "",
        "type": "Push"
    },
    "triggers": [
        {
            "device": {
                "name": "Temperature 1",
                "entityType": "sensors",
                "description": "Temperature 136",
                "deviceData": {
                    "name": "Basic Thermometer",
                    "model": "TH12345",
                    "brand": "IoT-Samples",
                    "groupType": "temperature",
                    "group": {
                        "name": "Temperature",
                        "deviceType": "sensor",
                        "options": {
                            "controlType": "SLIDER",
                            "minValue": 0,
                            "maxValue": 200,
                            "labelValue": "Temperature",
                            "scale": "Fahrenheit"
                        },
                        "icon": "temperature",
                        "cardType": "danger",
                        "expirationTimeValue": 5,
                        "expirationTimeUnit": "min",
                        "entityType": "groupDevices",
                        "key": "temperature",
                        "id": "fc269c9f-9a90-4f4b-97df-237689cb927c"
                    },
                    "entityType": "devices",
                    "id": "8bdd11b4-89e3-47c7-b0a0-3d547df1ea07"
                },
                "zone": "zone-1",
                "nodeRedId": "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#temperature_1",
                "id": "d9fa30ee-59f0-4a68-bed4-da226650d7a8",
                "area_id": "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
                "deviceId": "8bdd11b4-89e3-47c7-b0a0-3d547df1ea07",
                "selected": true
            },
            "entityType": "sensors",
            "triggerState": {
                "minValueInterval": 55,
                "whenItemSelected": "Below",
                "scaleItemSelected": "Fahrenheit",
                "description": "Temperature 1 is below 55 Fahrenheit"
            }
        },       
        {
            "device": {
                "name": "Basic Humidity",
                "entityType": "sensors",
                "deviceData": {
                    "name": "Basic Hummer",
                    "model": "HU-123456",
                    "brand": "IoT-Samples",
                    "groupType": "relative-humidity",
                    "group": {
                        "name": "Relative Humidity",
                        "deviceType": "sensor",
                        "options": {
                            "controlType": "SLIDER",
                            "minValue": 0,
                            "maxValue": 100,
                            "labelValue": "Humidity",
                            "scale": "Percent"
                        },
                        "icon": "r_hummer",
                        "cardType": "warning",
                        "expirationTimeValue": 5,
                        "expirationTimeUnit": "min",
                        "entityType": "groupDevices",
                        "key": "relative-humidity",
                        "id": "c57230b5-1f13-4231-ab2a-5342547abf7b"
                    },
                    "entityType": "devices",
                    "id": "e925094e-181c-400a-a129-ead8d0847919"
                },
                "zone": "zone-1",
                "nodeRedId": "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#basic_humidity",
                "id": "92dbe84f-e70f-4812-bb62-b7b33099c6b9",
                "area_id": "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
                "selected": true
            },
            "entityType": "sensors",
            "triggerState": {
                "minValueInterval": 66,
                "whenItemSelected": "Above",
                "scaleItemSelected": "Percent",
                "description": "Basic Humidity is above 66 Percent"
            }
        }
       
    ],
    "isEnabled": false,
    "actions": [],
    "condition": null
  };

  const params = {
    "name": "Rain",
    "condition": "ON",
    "value": [1],
    "type": "sensor",
    sensors,
    actuators
    
};
  const result = setDeviceParamsCommand(params, routine as RoutineEntity);
  const trigger = result.triggers[2];
  const triggerState = trigger.triggerState;
  expect(result.triggers.length).toEqual(3);
  expect(trigger.device?.id).toEqual("6fa4d86a-9ed6-4721-bc5e-c5c884e05805");
  expect(triggerState.description).toEqual("Rain is raining");
  
});

it('set sensor params. Boolean options and ON operator, replace trigger', () => {
  
  const routine: any = {
    priority: 0,
    name: "Test 3",
    entityType: "routines",
    notification: {
      isActivated: false,
      notificationMessage: "",
      type: "Push",
    },
    triggers: [
      {
        device: {
          name: "Temperature 1",
          entityType: "sensors",
          description: "Temperature 136",
          deviceData: {
            name: "Basic Thermometer",
            model: "TH12345",
            brand: "IoT-Samples",
            groupType: "temperature",
            group: {
              name: "Temperature",
              deviceType: "sensor",
              options: {
                controlType: "SLIDER",
                minValue: 0,
                maxValue: 200,
                labelValue: "Temperature",
                scale: "Fahrenheit",
              },
              icon: "temperature",
              cardType: "danger",
              expirationTimeValue: 5,
              expirationTimeUnit: "min",
              entityType: "groupDevices",
              key: "temperature",
              id: "fc269c9f-9a90-4f4b-97df-237689cb927c",
            },
            entityType: "devices",
            id: "8bdd11b4-89e3-47c7-b0a0-3d547df1ea07",
          },
          zone: "zone-1",
          nodeRedId: "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#temperature_1",
          id: "d9fa30ee-59f0-4a68-bed4-da226650d7a8",
          area_id: "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
          deviceId: "8bdd11b4-89e3-47c7-b0a0-3d547df1ea07",
          selected: true,
        },
        entityType: "sensors",
        triggerState: {
          minValueInterval: 55,
          whenItemSelected: "Below",
          scaleItemSelected: "Fahrenheit",
          description: "Temperature 1 is below 55 Fahrenheit",
        },
      },
      {
        device: {
          name: "Basic Humidity",
          entityType: "sensors",
          deviceData: {
            name: "Basic Hummer",
            model: "HU-123456",
            brand: "IoT-Samples",
            groupType: "relative-humidity",
            group: {
              name: "Relative Humidity",
              deviceType: "sensor",
              options: {
                controlType: "SLIDER",
                minValue: 0,
                maxValue: 100,
                labelValue: "Humidity",
                scale: "Percent",
              },
              icon: "r_hummer",
              cardType: "warning",
              expirationTimeValue: 5,
              expirationTimeUnit: "min",
              entityType: "groupDevices",
              key: "relative-humidity",
              id: "c57230b5-1f13-4231-ab2a-5342547abf7b",
            },
            entityType: "devices",
            id: "e925094e-181c-400a-a129-ead8d0847919",
          },
          zone: "zone-1",
          nodeRedId: "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#basic_humidity",
          id: "92dbe84f-e70f-4812-bb62-b7b33099c6b9",
          area_id: "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
          selected: true,
        },
        entityType: "sensors",
        triggerState: {
          minValueInterval: 66,
          whenItemSelected: "Above",
          scaleItemSelected: "Percent",
          description: "Basic Humidity is above 66 Percent",
        },
      },
      {
        device: {
          name: "Rain ",
          entityType: "sensors",
          deviceData: {
            name: "Rain Sensor",
            model: "QR-5679",
            brand: "IoT-Device",
            groupType: "rain",
            group: {
              icon: "rain",
              cardType: "info",
              deviceType: "sensor",
              options: {
                controlType: "ON/OFF",
                lblFirstMode: "Clear",
                lblSecondMode: "Raining",
                imageOn: "rain_on",
                imageOff: "rain_off",
              },
              name: "Rain",
              expirationTimeValue: 5,
              expirationTimeUnit: "min",
              entityType: "groupDevices",
              key: "rain",
              id: "3880df90-46b0-44a6-963a-2c4c6d755c58",
            },
            entityType: "devices",
            id: "58da00bc-92b2-4f7d-8bb1-52fb86de710c",
          },
          zone: "all",
          nodeRedId: "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#rain_",
          id: "6fa4d86a-9ed6-4721-bc5e-c5c884e05805",
          area_id: "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
          deviceId: "58da00bc-92b2-4f7d-8bb1-52fb86de710c",
          selected: false,
        },
        group: undefined,
        isGroup: undefined,
        entityType: "sensors",
        triggerState: {
          mode: 1,
          description: "Rain is raining",
        },
      },
    ],
    isEnabled: false,
    actions: [
    ],
    condition: null,
  };

  const params = {
    "name": "Rain",
    "condition": "OFF",
    "value": [0],
    "type": "sensor",
    sensors,
    actuators
    
};
  const result = setDeviceParamsCommand(params, routine as RoutineEntity);
  const trigger = result.triggers[2];
  const triggerState = trigger.triggerState;
  expect(result.triggers.length).toEqual(3);
  expect(trigger.device?.id).toEqual("6fa4d86a-9ed6-4721-bc5e-c5c884e05805");
  expect(triggerState.description).toEqual("Rain is clear");
  
});

it('set actuator params. Boolean options and OFF operator', () => {
  
  const routine: any = {
    priority: 0,
    name: "Test 3",
    entityType: "routines",
    notification: {
      isActivated: false,
      notificationMessage: "",
      type: "Push",
    },
    triggers: [
      {
        device: {
          name: "Temperature 1",
          entityType: "sensors",
          description: "Temperature 136",
          deviceData: {
            name: "Basic Thermometer",
            model: "TH12345",
            brand: "IoT-Samples",
            groupType: "temperature",
            group: {
              name: "Temperature",
              deviceType: "sensor",
              options: {
                controlType: "SLIDER",
                minValue: 0,
                maxValue: 200,
                labelValue: "Temperature",
                scale: "Fahrenheit",
              },
              icon: "temperature",
              cardType: "danger",
              expirationTimeValue: 5,
              expirationTimeUnit: "min",
              entityType: "groupDevices",
              key: "temperature",
              id: "fc269c9f-9a90-4f4b-97df-237689cb927c",
            },
            entityType: "devices",
            id: "8bdd11b4-89e3-47c7-b0a0-3d547df1ea07",
          },
          zone: "zone-1",
          nodeRedId: "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#temperature_1",
          id: "d9fa30ee-59f0-4a68-bed4-da226650d7a8",
          area_id: "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
          deviceId: "8bdd11b4-89e3-47c7-b0a0-3d547df1ea07",
          selected: true,
        },
        entityType: "sensors",
        triggerState: {
          minValueInterval: 55,
          whenItemSelected: "Below",
          scaleItemSelected: "Fahrenheit",
          description: "Temperature 1 is below 55 Fahrenheit",
        },
      },
      {
        device: {
          name: "Basic Humidity",
          entityType: "sensors",
          deviceData: {
            name: "Basic Hummer",
            model: "HU-123456",
            brand: "IoT-Samples",
            groupType: "relative-humidity",
            group: {
              name: "Relative Humidity",
              deviceType: "sensor",
              options: {
                controlType: "SLIDER",
                minValue: 0,
                maxValue: 100,
                labelValue: "Humidity",
                scale: "Percent",
              },
              icon: "r_hummer",
              cardType: "warning",
              expirationTimeValue: 5,
              expirationTimeUnit: "min",
              entityType: "groupDevices",
              key: "relative-humidity",
              id: "c57230b5-1f13-4231-ab2a-5342547abf7b",
            },
            entityType: "devices",
            id: "e925094e-181c-400a-a129-ead8d0847919",
          },
          zone: "zone-1",
          nodeRedId: "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#basic_humidity",
          id: "92dbe84f-e70f-4812-bb62-b7b33099c6b9",
          area_id: "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
          selected: true,
        },
        entityType: "sensors",
        triggerState: {
          minValueInterval: 66,
          whenItemSelected: "Above",
          scaleItemSelected: "Percent",
          description: "Basic Humidity is above 66 Percent",
        },
      },
      {
        device: {
          name: "Rain ",
          entityType: "sensors",
          deviceData: {
            name: "Rain Sensor",
            model: "QR-5679",
            brand: "IoT-Device",
            groupType: "rain",
            group: {
              icon: "rain",
              cardType: "info",
              deviceType: "sensor",
              options: {
                controlType: "ON/OFF",
                lblFirstMode: "Clear",
                lblSecondMode: "Raining",
                imageOn: "rain_on",
                imageOff: "rain_off",
              },
              name: "Rain",
              expirationTimeValue: 5,
              expirationTimeUnit: "min",
              entityType: "groupDevices",
              key: "rain",
              id: "3880df90-46b0-44a6-963a-2c4c6d755c58",
            },
            entityType: "devices",
            id: "58da00bc-92b2-4f7d-8bb1-52fb86de710c",
          },
          zone: "all",
          nodeRedId: "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#rain_",
          id: "6fa4d86a-9ed6-4721-bc5e-c5c884e05805",
          area_id: "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
          deviceId: "58da00bc-92b2-4f7d-8bb1-52fb86de710c",
          selected: false,
        },
        group: undefined,
        isGroup: undefined,
        entityType: "sensors",
        triggerState: {
          mode: 1,
          description: "Rain is raining",
        },
      },
    ],
    isEnabled: false,
    actions: [
    ],
    condition: null,
  };

  const params = {
    "name": "test solenoide",
    "condition": "OFF",
    "value": [0],
    "type": "actuator",
    sensors,
    actuators
    
};
  const result = setDeviceParamsCommand(params, routine as RoutineEntity);
  const trigger = result.actions[0];
  const triggerState = trigger.triggerState;
  expect(result.actions.length).toEqual(1);
  expect(trigger.device?.id).toEqual("b9012cdf-82ed-4e2f-92fc-70278bea6480");
  expect(triggerState.description).toEqual("test solenoid is off");
  
});

