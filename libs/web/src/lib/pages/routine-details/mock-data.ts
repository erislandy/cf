
export const getInitialData = () => ({
    infoFields: [
        {
          command: 'set-name',
          required: true,
          label: 'Name: ',
          value: 'Routine 1',
          state: 'valid',
          type: 'simple'
        },
        {
          command: 'set-enabled',
          required: true,
          label: 'State: ',
          value: 'Active',
          state: 'valid',
          type: 'simple'
        },
        {
          command: 'set-repetition-days',
          required: false,
          label: 'Active Days: ',
          value: 'Mon, Tue, Sat, Sun',
          state: 'invalid',
          type: 'simple'
        },
        {
          command: 'set-interval',
          required: false,
          label: 'Interval: ',
          value: '8:00 AM to 9:00 AM',
          state: 'pending',
          type: 'simple'
        },
        {
          command: 'set-supress-for',
          required: false,
          label: 'Supress for: ',
          value: '5 minutes',
          state: 'disabled',
          type: 'simple'
        },
    ],
    triggerFields: [
        {
          command: 'trigger-settings',
          required: false,
          label: 'Trigger settings: ',
          type: 'group',
          value: ['Temperature Z1 above 50F', 'Humidity Z1 above 80%'],
          state: 'valid',
        },
      ],
      actionFields: [
        {
          command: 'action-settings',
          required: false,
          label: 'Trigger settings: ',
          type: 'group',
          value: ['SM Curtain Z1 is Open', 'Valve_Z1-1 is On'],
          state: 'valid',
        },
      ],
      notificationFields: [
        {
          command: 'enable-notification',
          required: false,
          label: 'State: ',
          type: 'simple',
          value: 'Disabled',
          state: 'valid',
        },
        {
          command: 'set-notification',
          required: false,
          label: 'Email notification: ',
          type: 'group',
          value: ['Push notifications', 'Email notifications'],
          state: 'valid',
      }]
});

export const sensors: Array<{
    id: string;
    nodeRedId: string;
    name: string;
    selected: boolean;
  }> = [
    {
      name: 'Temperature Z1',
      id: '8115dd8c-f844-4edc-86c4-d03d0b5c899a',
      nodeRedId:
        'costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#temperature_z1',
      selected: true,
    },
    {
      name: 'Temperature Z2',
      id: '11f4f644-d6a5-4217-9f72-a79be5362cca',
      nodeRedId:
        'costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#temperature_z2',
        selected: false,
    },

    {
      name: 'Temperature Z3',
      id: 'd510f238-ef39-4f8d-9d4b-745bac77d2cb',
      nodeRedId:
        'costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#temperature_z3',
        selected: false,
    },

    {
      name: 'Temperature Z4',
      id: '53b98566-5e81-468e-8123-4021dca65e93',
      nodeRedId:
        'costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#temperature_z4',
        selected: false,
    },

    {
      name: 'Humidity Z1',
      id: 'cda2cfcd-efb0-4ee4-ad07-d3a68bd40d4f',
      nodeRedId: 'costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#humidity_z1',
      selected: true,
    },
  ];
export const actuators: Array<{
    id: string;
    nodeRedId: string;
    name: string;
    selected: boolean;
  }> =[
    {
        "name": "SM Curtain Z1",
       "nodeRedId": "costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#sm_curtain_z1",
        "id": "b4b4da59-0749-4289-a02a-1876b0ae5474",
        selected: true,
    },
    {
        "name": "SM Curtain Z3",
        "nodeRedId": "costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#sm_curtain_z3",
        "id": "20a107b2-9a36-401e-bd46-81dc2c2f99a3",
        selected: false,
    },
    {
        "name": "SM Curtain Z4",
        "nodeRedId": "costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#sm_curtain_z4",
        "id": "8c07395e-839f-4a8f-af7c-d569cb58b2e6",
        selected: false,
    },
    {
        "nodeRedId": "costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#valve_z1-1",
        "name": "Valve_Z1-1",
        "id": "8ec6e59a-7de4-4f35-a9f8-1ca22c853027",
        selected: true,
    },
    {
        "nodeRedId": "costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#valve_z1-2",
        "name": "Valve_Z1-2",
        "id": "2c5ee534-37e5-4f5e-b9cc-8f4a4de4bfc4",
        selected: false,
    },
    {
        "nodeRedId": "costafarm#4c20dc27-8735-4c07-851f-38b589c49eda#valve_z1-3",
        "name": "Valve_Z1-3",
        "id": "fae2b9d3-aa3f-4e8c-935f-0aef6db2e08c",
        selected: false,
    }
]

export const routines = [
  {
      "id": "2b5592b6-d11b-42ca-a3ee-d22cd2eb75b3",
      "priority": 126,
      "name": "HOUSE 1 MIST GROUP 1",
      "triggers": [],
      "actions": [
          {
              "triggerState": {
                  "description": "H-1 BAY-1 DIEFF (Group) on Sequential On/Off"
              },
              "isGroup": true,
              "group": {
                  "id": "9eb204c5-67f0-4011-a6d7-1839765d3532"
              },
              "device": {},
              "entityType": "actuators"
          }
      ],
      "condition": {
          "activated": true,
          "activeDays": [
              0,
              1,
              2,
              3,
              4,
              5,
              6
          ],
          "activatedBetween": {
              "dateEnd": 1691098200000,
              "dateIni": 1691069580000
          },
          "suppressFor": 5
      },
      "isEnabled": true,
      "notification": {
          "isActivated": false,
          "notificationMessage": "H-1 BAY-1 DIEFF executed"
      },
      "area_id": "4c20dc27-8735-4c07-851f-38b589c49eda",
      "entityType": "routines"
  },
  {
      "id": "681f510a-9fe8-4bc3-be65-f8e7a4675346",
      "priority": 125,
      "name": "HOUSE 1 MIST GROUP 2",
      "triggers": [],
      "actions": [
          {
              "triggerState": {
                  "description": "HOUSE 1 MIST GROUP 2 (Group) on Same Time"
              },
              "isGroup": true,
              "group": {
                  "id": "9d7866e8-eb45-496b-ab2c-c2bd49b7adc7"
              },
              "device": {},
              "entityType": "actuators"
          }
      ],
      "condition": {
          "activated": true,
          "activeDays": [
              0,
              1,
              2,
              3,
              4,
              5,
              6
          ],
          "activatedBetween": {
              "dateEnd": 1691447460000,
              "dateIni": 1691415060000
          },
          "suppressFor": 5
      },
      "isEnabled": true,
      "notification": {
          "isActivated": false,
          "notificationMessage": "HOUSE 1 GROUP 2 executed"
      },
      "area_id": "4c20dc27-8735-4c07-851f-38b589c49eda",
      "entityType": "routines"
  },
  {
      "id": "4c4cb084-b7e8-4e06-9287-a34c09689544",
      "priority": 124,
      "name": "HOUSE 1 MIST GROUP 3",
      "triggers": [],
      "actions": [
          {
              "triggerState": {
                  "description": "HOUSE 1 MIST GROUP 3 (Group) on Sequential On/Off"
              },
              "isGroup": true,
              "group": {
                  "id": "7a651838-171e-41f5-9c52-dc571cb6f361"
              },
              "device": {},
              "entityType": "actuators"
          }
      ],
      "condition": {
          "activated": true,
          "activeDays": [
              0,
              1,
              2,
              3,
              4,
              5,
              6
          ],
          "activatedBetween": {
              "dateEnd": 1691533800000,
              "dateIni": 1691501520000
          },
          "suppressFor": 5
      },
      "isEnabled": true,
      "notification": {
          "isActivated": false,
          "notificationMessage": "HOUSE 1 MIST GROUP 3 executed"
      },
      "area_id": "4c20dc27-8735-4c07-851f-38b589c49eda",
      "entityType": "routines"
  },
  {
      "id": "b175d9f1-f389-4572-ae0f-b866d662c56e",
      "priority": 123,
      "name": "HOUSE 1 MIST GROUP 4",
      "triggers": [],
      "actions": [
          {
              "triggerState": {
                  "description": "HOUSE 1 MIST GROUP 4 (Group) on Sequential On/Off"
              },
              "isGroup": true,
              "group": {
                  "id": "3324475c-e26f-4294-b578-bc075b4171f8"
              },
              "device": {},
              "entityType": "actuators"
          }
      ],
      "isEnabled": false,
      "condition": {
          "activated": true,
          "activeDays": [
              0,
              1,
              2,
              3,
              4,
              5,
              6
          ],
          "activatedBetween": {
              "dateEnd": 1694727000000,
              "dateIni": 1694698500000
          },
          "suppressFor": 5
      },
      "notification": {
          "isActivated": false,
          "notificationMessage": "HOUSE 1 MIST GROUP 4 executed"
      },
      "area_id": "4c20dc27-8735-4c07-851f-38b589c49eda",
      "entityType": "routines"
  },
  {
      "id": "ff68e86d-5d49-4e03-a673-65333551f758",
      "priority": 122,
      "name": "HOUSE 1 BAY 1",
      "triggers": [],
      "actions": [
          {
              "triggerState": {
                  "mode": 1,
                  "description": "Valve_Z1-1 is ON"
              },
              "isGroup": false,
              "device": {
                  "id": "8ec6e59a-7de4-4f35-a9f8-1ca22c853027"
              },
              "group": {},
              "entityType": "actuators"
          }
      ],
      "condition": {
          "activated": true,
          "activeDays": [
              2
          ],
          "activatedBetween": {
              "dateEnd": 1694033940000,
              "dateIni": 1694033460000
          },
          "suppressFor": 5
      },
      "isEnabled": false,
      "notification": {
          "isActivated": false,
          "notificationMessage": "HOUSE 1 BAY 1 executed"
      },
      "area_id": "4c20dc27-8735-4c07-851f-38b589c49eda",
      "entityType": "routines"
  }
]