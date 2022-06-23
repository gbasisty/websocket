import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocketService } from '../../services/socket.service'; 

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {
  public id: number = 0;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
  }

  printSocketUrl(){
    console.log(environment.socketUrl);
  }

}
