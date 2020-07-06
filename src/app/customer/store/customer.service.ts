import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as CustomerActions from './customer.actions';
import * as CustomerSelectors from './customer.selectors';

import { Customer } from './customer.model';

@Injectable()
export class CustomerService {

  constructor(private store: Store<Customer>) { }

  public loadCustomersMethods() {
    this.store.dispatch(CustomerActions.loadCustomers());
  }

  public addCustomer(newCustomer: Customer) {
    this.store.dispatch(
      CustomerActions.addCustomer({
        newCustomer: { ...newCustomer }
      })
    );
  }

  public removeCustomer(customerKey: string) {
    this.store.dispatch(
      CustomerActions.removeCustomer({
        customerKey: customerKey
      })
    );
  }

  public getCustomerList$(): Observable<Customer[]> {
    return this.store.select(CustomerSelectors.getCustomerList);
  }
}
