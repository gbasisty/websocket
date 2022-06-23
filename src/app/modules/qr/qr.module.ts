import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { QrRoutingModule } from './qr-routing.module';
import { QrComponent } from './components/qr/qr.component';

const config: SocketIoConfig = {
	url: environment.socketUrl,
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    QrComponent
  ],
  imports: [
    CommonModule,
    QrRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ]
})
export class QrModule { }
