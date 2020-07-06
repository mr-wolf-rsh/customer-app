import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { Customer, setValidationMessageCondition } from '../store/customer.model';
import { CustomerService } from '../store/customer.service';

import { mean, std, format } from 'mathjs'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public customersList$: Observable<Customer[]>;
  public customerRequest: Customer;

  private dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

  constructor(private customerService: CustomerService) {
    this.customerRequest = { key: null, firstName: null, lastName: null, age: null, birthday: null };
  }

  ngOnInit(): void {
    this.customerService.loadCustomersMethods();
    this.customersList$ = this.customerService.getCustomerList$();
  }

  formatDate(date: any): string {
    return new Date(date).toLocaleDateString("es-PE", this.dateOptions);
  }

  addNewCustomer(form: NgForm): void {
    if (form.invalid) {
      return
    }
    this.customerService.addCustomer(this.customerRequest);
    form.reset();
  }

  deleteCustomer(key: any): void {
    if (!confirm('¿Desea continuar con esta operación?')) {
      return;
    }
    this.customerService.removeCustomer(key);
  }

  getCalculation(customers: Customer[], flag: boolean): string {
    if (customers.length == 0) {
      return 0 + '';
    }
    const ages = customers.map(v => v.age);
    const result = flag ? std(ages) : mean(ages);
    return format(result, { notation: 'fixed', precision: 3 });
  }

  // Condition for validation message
  setValidationMessageCondition(formControl: any, whenDirty: boolean = true, whenTouched: boolean = true) {
    return setValidationMessageCondition(formControl, whenDirty, whenTouched);
  }
}
