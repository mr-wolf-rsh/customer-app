import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerComponent } from './views/customer.component';

import { CustomerService } from './store/customer.service'

import { StoreModule } from '@ngrx/store';
import * as fromCustomer from './store/customer.reducer';

import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './store/customer.effects';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forFeature(fromCustomer.customerFeatureKey, fromCustomer.reducer),
    EffectsModule.forFeature([CustomerEffects])
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
