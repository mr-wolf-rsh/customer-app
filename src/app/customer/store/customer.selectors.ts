import { createFeatureSelector, createSelector } from '@ngrx/store';

import { customerFeatureKey, CustomerState } from './customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>(
  customerFeatureKey
);

export const getCustomerList = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.customers
);
