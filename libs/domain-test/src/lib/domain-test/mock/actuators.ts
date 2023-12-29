export const actuators = [
    {
        "name": "Fan z1_1",
        "entityType": "actuators",
        "description": "Fan 1 zone 1",
        "zone": "zone-1",
        "deviceData": {
            "groupType": "fan",
            "name": "Basic Fan",
            "model": "BF-123456",
            "brand": "IoT-Samples",
            "group": {
                "name": "Fan",
                "deviceType": "actuator",
                "options": {
                    "controlType": "ON/OFF",
                    "lblFirstMode": "OFF",
                    "lblSecondMode": "ON",
                    "imageOn": "fan_enabled",
                    "imageOff": "fan_disabled"
                },
                "propertyName": "fanEnabled",
                "icon": "fan",
                "cardType": "info",
                "entityType": "groupDevices",
                "property": "fanenabled",
                "key": "fan",
                "id": "61e3d57b-8564-45ee-9f15-09f0ef45ded2"
            },
            "entityType": "devices",
            "id": "a4eae138-3e11-4f1a-b4c8-5e2d6bd55e27",
            "property": "fanenabled"
        },
        "nodeRedId": "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#fan_z1_1",
        "device": {
            "id": "a4eae138-3e11-4f1a-b4c8-5e2d6bd55e27"
        },
        "id": "2bb8b296-ee41-4b4b-97a1-f89efce03bd1",
        "area_id": "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
        "selected": false
    },
    {
        "name": "Fan z1-2",
        "entityType": "actuators",
        "description": "Fan 2 zone 1",
        "zone": "zone-1",
        "deviceData": {
            "groupType": "fan",
            "name": "Basic Fan",
            "model": "BF-123456",
            "brand": "IoT-Samples",
            "group": {
                "name": "Fan",
                "deviceType": "actuator",
                "options": {
                    "controlType": "ON/OFF",
                    "lblFirstMode": "OFF",
                    "lblSecondMode": "ON",
                    "imageOn": "fan_enabled",
                    "imageOff": "fan_disabled"
                },
                "propertyName": "fanEnabled",
                "icon": "fan",
                "cardType": "info",
                "entityType": "groupDevices",
                "property": "fanenabled",
                "key": "fan",
                "id": "61e3d57b-8564-45ee-9f15-09f0ef45ded2"
            },
            "entityType": "devices",
            "id": "a4eae138-3e11-4f1a-b4c8-5e2d6bd55e27",
            "property": "fanenabled"
        },
        "nodeRedId": "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#fan_z1-2",
        "device": {
            "id": "a4eae138-3e11-4f1a-b4c8-5e2d6bd55e27"
        },
        "id": "5022e364-d857-480a-a850-04d890069c91",
        "area_id": "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
        "selected": false
    },
    {
        "name": "Curtain z1-1",
        "entityType": "actuators",
        "description": "Curtain 1 zone 1 fgfdg",
        "zone": "zone-1",
        "deviceData": {
            "name": "Basic Curtain",
            "model": "BCU-1234",
            "brand": "IoT Samples",
            "groupType": "curtain",
            "property": "isopen",
            "group": {
                "name": "Curtain",
                "deviceType": "actuator",
                "options": {
                    "controlType": "ON/OFF",
                    "lblFirstMode": "Close",
                    "lblSecondMode": "Open",
                    "imageOn": "curtain_opened",
                    "imageOff": "curtain_closed"
                },
                "propertyName": "isOpen",
                "icon": "curtain",
                "cardType": "warning",
                "entityType": "groupDevices",
                "key": "curtain",
                "id": "453f089a-f52d-4eb2-a5b7-b23d02be4711",
                "property": "isopen"
            },
            "entityType": "devices",
            "id": "90281549-8a8f-4a92-b619-2f0d71a9720a"
        },
        "nodeRedId": "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#curtain_z1-1",
        "device": {
            "id": "f26fd86f-f72e-4371-8bad-bb0e569352e3"
        },
        "id": "f3333081-cf3f-489d-89d3-46a21a9c3297",
        "area_id": "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
        "bistableTime": 30,
        "bistableUnit": "sec",
        "deviceId": "90281549-8a8f-4a92-b619-2f0d71a9720a",
        "selected": false
    },
    {
        "name": "Curtain z2-1",
        "entityType": "actuators",
        "description": "Curtain 1 zone 2",
        "zone": "zone-2",
        "deviceData": {
            "name": "Basic Curtain",
            "model": "BCU-1234",
            "brand": "IoT Samples",
            "groupType": "curtain",
            "property": "isopen",
            "group": {
                "name": "Curtain",
                "deviceType": "actuator",
                "options": {
                    "controlType": "ON/OFF",
                    "lblFirstMode": "Close",
                    "lblSecondMode": "Open",
                    "imageOn": "curtain_opened",
                    "imageOff": "curtain_closed"
                },
                "propertyName": "isOpen",
                "icon": "curtain",
                "cardType": "warning",
                "entityType": "groupDevices",
                "key": "curtain",
                "id": "453f089a-f52d-4eb2-a5b7-b23d02be4711",
                "property": "isopen"
            },
            "entityType": "devices",
            "id": "90281549-8a8f-4a92-b619-2f0d71a9720a"
        },
        "nodeRedId": "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#curtain_z2-1",
        "device": {
            "id": "f26fd86f-f72e-4371-8bad-bb0e569352e3"
        },
        "id": "5261f849-c716-48c7-bc1a-319cbb73b87e",
        "area_id": "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
        "bistableTime": 45,
        "bistableUnit": "sec",
        "deviceId": "90281549-8a8f-4a92-b619-2f0d71a9720a",
        "selected": false
    },
    {
        "name": "test solenoid",
        "entityType": "actuators",
        "description": "test solenoid",
        "zone": "zone-1",
        "deviceData": {
            "groupType": "solenoid",
            "name": "Basic Solenoid",
            "model": "SO-12345",
            "brand": "IoT-Sampless",
            "group": {
                "name": "Solenoid",
                "deviceType": "actuator",
                "options": {
                    "controlType": "ON/OFF",
                    "lblFirstMode": "OFF",
                    "lblSecondMode": "ON",
                    "imageOn": "solenoid_enabled",
                    "imageOff": "solenoid_disabled"
                },
                "propertyName": "Is Activated",
                "icon": "solenoid",
                "cardType": "info",
                "entityType": "groupDevices",
                "property": "is-activated",
                "key": "solenoid",
                "id": "45254436-e527-4e69-80d1-90b9811a8ab0"
            },
            "entityType": "devices",
            "id": "175b7d26-dd2f-4fea-b236-e29e74db7f8d",
            "property": "is-activated"
        },
        "nodeRedId": "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#test_solenoid",
        "id": "b9012cdf-82ed-4e2f-92fc-70278bea6480",
        "area_id": "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
        "selected": false
    },
    {
        "name": "Curtain z1-2",
        "entityType": "actuators",
        "description": "Cortina 2 del area 1",
        "zone": "zone-1",
        "deviceData": {
            "name": "Basic Curtain",
            "model": "BCU-1234",
            "brand": "IoT Samples",
            "groupType": "curtain",
            "property": "isopen",
            "group": {
                "name": "Curtain",
                "deviceType": "actuator",
                "options": {
                    "controlType": "ON/OFF",
                    "lblFirstMode": "Close",
                    "lblSecondMode": "Open",
                    "imageOn": "curtain_opened",
                    "imageOff": "curtain_closed"
                },
                "propertyName": "isOpen",
                "icon": "curtain",
                "cardType": "warning",
                "entityType": "groupDevices",
                "key": "curtain",
                "id": "453f089a-f52d-4eb2-a5b7-b23d02be4711",
                "property": "isopen"
            },
            "entityType": "devices",
            "id": "90281549-8a8f-4a92-b619-2f0d71a9720a"
        },
        "nodeRedId": "costafarm#e563c6a6-b3d4-4eec-acd4-426d2b7615be#curtain_z1-2",
        "id": "55ef11c6-d7dd-44f4-a741-86bf9300b28e",
        "area_id": "e563c6a6-b3d4-4eec-acd4-426d2b7615be",
        "selected": false
    }
];
