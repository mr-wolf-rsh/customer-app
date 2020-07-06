import { createAction, props } from '@ngrx/store';

import { Customer } from './customer.model'

export const loadCustomers = createAction(
  '[Customer] Load Customers'
);

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ customerList: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: any }>()
);

export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{ newCustomer: Customer }>()
);

export const addCustomerFailure = createAction(
  '[Customer] Add Customer Failure',
  props<{ error: any }>()
);

export const removeCustomer = createAction(
  '[Customer] Remove Customer',
  props<{ customerKey: string }>()
);

export const removeCustomerFailure = createAction(
  '[Customer] Remove Customer Failure',
  props<{ error: any }>()
);
