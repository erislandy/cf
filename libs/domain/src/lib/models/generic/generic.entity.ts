export interface GenericEntity {
  id?: string;
  entityType: EntityType;
}

export enum EntityType {
  DEVICE = 'devices',
  AREA = 'areas',
  AREA_CONFIG = 'areaConfigs',
  AREA_GROUP = 'areaGroups',
  AREA_DEVICE = 'areaDevices',
  ROUTINE = 'routines',
  RULE = 'rules',
  SENSOR = 'sensors',
  ACTUATOR = 'actuators',
  GROUP_DEVICE = 'groupDevices',
  DRAGINO = 'draginos',
  MDB_DEVICE = 'mdbDevices',
  IMAGE_DEVICE = 'imageDevices',
  USERS_AD = 'users',
  ACTION = 'actions',
  ROLE = 'roles',
  GROUP_TYPE = 'groupTypes',
  // PROFILE = 'profile',
  PARAM_CONFIG = 'paramConfigs',
  DEVICE_IMAGE = 'deviceImage'
}