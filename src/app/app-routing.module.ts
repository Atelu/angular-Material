import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceplaceComponent } from './serviceplace/serviceplace.component';
import { ConsultationComponent } from './consultation/consultation.component';


const routes: Routes = [

//   {
//     path: 'login',
//     loadChildren: () =>
//         import('../app/login/login.module').then(
//             m => m.LoginModule,
//         ),
// },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
   {
     path: 'login',
     loadChildren: './login/login.module#LoginModule',
   },
   {
    path: 'dashboard',
    component: DashboardComponent,
  },
{
  path: 'serviceplace',
  component: ServiceplaceComponent,
},
{
  path: 'consultation',
  component: ConsultationComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
