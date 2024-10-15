export interface GenericEntity {
  id?: string;
  entityType: EntityType;
}

export enum EntityType {
  EMPLOYEE = 'employee',
  OPERATION = 'operation',
  CURRENCY = 'currency',
  OPERATION_TYPE = 'operation_type',
  CURRENCY_FACTOR = 'currency_factor',
  PRODUCT_CURRENT_PRICE = 'product_current_price',
  STOCK = 'stock'  
}