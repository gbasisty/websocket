import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'qr',
    loadChildren: () => import('./modules/qr/qr.module')
    .then(m => m.QrModule)
  },
  {
    path: '',
    redirectTo: 'qr',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
