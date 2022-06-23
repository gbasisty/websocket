import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'; 

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  fetchMovies() {
		this.socket.emit('fetchMovies');
	} 

	// listen event
	onFetchMovies() {
		return this.socket.fromEvent('fetchMovies');
	}
}