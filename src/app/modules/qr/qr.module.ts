import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QrRoutingModule } from './qr-routing.module';
import { QrComponent } from './components/qr/qr.component';


@NgModule({
  declarations: [
    QrComponent
  ],
  imports: [
    CommonModule,
    QrRoutingModule,
    FormsModule
  ]
})
export class QrModule { }
