import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { concatMap, mergeMap, map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CustomerActions from './customer.actions';
import { Customer } from './customer.model';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class CustomerEffects {
  private dbPath = 'customers';

  customersRef: AngularFireList<Customer>;

  constructor(private actions$: Actions, private db: AngularFireDatabase) {
    this.customersRef = this.db.list(this.dbPath);
  }

  public loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(() => this.customersRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )),
      concatMap((customerList) => {
        try {
          return of(CustomerActions.loadCustomersSuccess({ customerList }));
        } catch (e) {
          return of(CustomerActions.loadCustomersFailure({ error: e }));
        }
      })
    ));

  public addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      concatMap(action => {
        try {
          this.customersRef.push(action.newCustomer);
          return EMPTY;
        } catch (e) {
          return of(CustomerActions.addCustomerFailure({ error: e }));
        }
      })
    ));

  public removeCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.removeCustomer),
      concatMap(action => {
        try {
          this.customersRef.remove(action.customerKey);
          return EMPTY;
        } catch (e) {
          return of(CustomerActions.addCustomerFailure({ error: e }));
        }
      })
    ));
}
