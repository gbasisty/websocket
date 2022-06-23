import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebSocketCollectorService } from './web-socket-collector.service';

@Injectable()
export class CollectorService {
  public messages: Subject<any>;

  constructor(public webSocketCollectorService: WebSocketCollectorService) {
    this.messages = <Subject<any>>(
      webSocketCollectorService.connect(environment.socketUrl).pipe(map((response: MessageEvent): any => {
        return response.data;
      }))
    );
  }
}