export interface GenericEntity {
  id?: string;
  entityType: EntityType;
}

export enum EntityType {
  EMPLOYEE = 'employees',
  OPERATION = 'operations',
  CURRENCY = 'currencies',
  OPERATION_TYPE = 'operation_types',
  CURRENCY_FACTOR = 'currency_factor',
  PRODUCT_CURRENT_PRICE = 'product_current_price',
  STOCK = 'stock',
  PRODUCT = 'store_products' ,
  TRANSACTION = 'transactions' 
}