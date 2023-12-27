export interface GenericEntity {
  id?: string;
  entityType: EntityType;
}

export enum EntityType {
  ACTION = 'actions',
  ACTUATOR = 'actuators',
  AREA = 'areas',
  AREA_CONFIG = 'areaConfigs',
  AREA_DEVICE = 'areaDevices',
  AREA_GROUP = 'areaGroups',
  DEVICE = 'devices',
  DEVICE_IMAGE = 'deviceImage',
  DRAGINO = 'draginos',
  GROUP_DEVICE = 'groupDevices',
  GROUP_TYPE = 'groupTypes',
  IMAGE_DEVICE = 'imageDevices',
  MDB_DEVICE = 'mdbDevices',
  NUTRIENTS = 'nutrients',
  PARAM_CONFIG = 'paramConfigs',
  RECIPES = 'recipes',
  ROLE = 'roles',
  ROUTINE = 'routines',
  RULE = 'rules',
  SENSOR = 'sensors',
  USERS_AD = 'users',
}