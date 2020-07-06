import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =
  [
    {
      path: '', redirectTo: 'customer', pathMatch: 'full'
    },
    {
      path: 'customer',
      loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
    },
    {
      path: '**', redirectTo: ''
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
