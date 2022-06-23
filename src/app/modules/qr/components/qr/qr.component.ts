import { Component, OnInit } from '@angular/core';
import { WebSocketCollectorService } from '../../services/web-socket-collector.service';
import { CollectorService } from '../../services/collector.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
  providers: [WebSocketCollectorService, CollectorService]
})
export class QrComponent implements OnInit {
  public authenticationButtonDisabled: boolean = false;
  public authenticated: boolean = false;
  public qrIdentificationControlsDisabled: boolean = true;
  public qrId: number = 0;
  public qrIdientificated: boolean = false;
  public qrStatus: string = 'INDETERMINADO';
  public paymentStatus: string = 'INDETERMINADO';
  public showLastMessage: boolean = false;

  private authenticationInformation = {
    token: "Basic Vmtq7wSmOjQrnRJ2n6LaZv6kizdbx+/JOIohrTCABZxcIVNJtxRJbw/m7yC2zwb6Wn+/9o/1NNvpVhwVnZjBs1FJYWFHSG6KwxKeBLHH/3+XQIvpKfdjZhYKBfWh6slzVUO61dzjvdZ/xznssrpHreEdfyaQCl25Ztb6SOexhmGViXCoe6lZg/NJYzHGHNcUWbzc2phMz3TyiG5eqDr1SubZNgXUhyu9jw2LuASxiOB4RLMYpZPkYk7QxJnrQtVaT10/szhFzJoLCyluWQ1d6GA4GIhTjvFY6CqyYzAffa3b2OgkK9EtQgN8hlJEpUq+DeR4/zlXOMJL5cM1Wbxtvw==",
    relatedEntityId: 2
  }

  constructor(private collectorService: CollectorService) {
    collectorService.messages.subscribe((msg) => {
      this.parseMessage(msg);
    });
  }

  ngOnInit(): void {
  }

  public login() {
    this.collectorService.messages.next(this.authenticationInformation);
  }

  public sendMessage() {
    this.collectorService.messages.next(this.qrId);
  }

  private parseMessage(message: any){
    message = JSON.parse(message);

    // PASO 1: autenticarse
    if(!this.authenticated) {
      if(message.status != 'OK' || !message.data.authenticationOk) 
        console.log('No fue posible autenticarse');
      else {
        this.authenticated = true;
        console.log('Autenticado');
        this.authenticationButtonDisabled = true;
        this.qrIdentificationControlsDisabled = false;
      }

      return;
    }

    // PASO 2: identificar QR
    if(!this.qrIdientificated) {
      if(message.status != 'OK') {
        console.log('No fue posible identificar el QR');
        this.qrStatus = message.hasOwnProperty('data')? message.data.status : 'INDETERMINADO';
      } else {
        console.log('Identificado el QR');
        this.qrIdientificated = true;
        this.qrStatus = message.data.status;
        this.qrIdentificationControlsDisabled = true;
      }

      return;
    }

    // PASO 3: darle seguimiento a los cambios de estado
    this.qrStatus = message.data.status;

    if(['APPROVED', 'REJECTED', 'CANCELLED'].includes(this.qrStatus)) {
      this.paymentStatus = this.qrStatus;
      this.showLastMessage = true;
    }
  }
}
