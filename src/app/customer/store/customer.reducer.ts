import { Action, createReducer, on } from '@ngrx/store';

import * as CustomerActions from './customer.actions';

import { Customer } from './customer.model';

export const customerFeatureKey = 'customer';

export interface CustomerState {
  customers: Customer[]
}

export const initialState: CustomerState = {
  customers: []
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, state => state),
  on(CustomerActions.loadCustomersSuccess,
    (state, { customerList }) => {
      return {
        ...state,
        customers: customerList
      }
    }),
  on(CustomerActions.loadCustomersFailure, state => state),
  on(CustomerActions.addCustomer,
    (state, { newCustomer }) => {
      return {
        ...state,
        customers: [...state.customers, newCustomer]
      };
    }),
  on(CustomerActions.addCustomerFailure, state => state),
  on(CustomerActions.removeCustomer,
    (state, { customerKey }) => {
      const customersList = state.customers;
      const filteredList = customersList.filter(c => c.key !== customerKey)
      return {
        ...state,
        customers: filteredList
      };
    }),
  on(CustomerActions.removeCustomerFailure, state => state)
);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}
