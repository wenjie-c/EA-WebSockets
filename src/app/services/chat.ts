import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { observable, Observable } from 'rxjs';
import { Handshake } from '../models/Handshake';

export interface Mensaje {
  usuario: any;
  organizacion: string;
  contenido: string;
  _id?: string;
  leido?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Chat {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:9000';

  constructor(private http: HttpClient) {
    this.socket = io(this.SERVER_URL);

    this.socket.on('connect', () => {
      console.log('✅ Socket conectado:', this.socket.id);
    });

    this.socket.on('disconnect', () => {});

    this.socket.on('user-typing', (data) => {});
  }

  getHistory(): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.SERVER_URL}/mensajes`);
  }

  joinOrganization(organizacionId: string): void {
    this.socket.emit('join-organization', organizacionId);
  }

  sendMessage(mensaje: Mensaje): void {
    this.socket.emit('message', mensaje);
  }

  sendTyping(usuario: string, usuarioName: string): void {
    this.socket.emit('typing', { usuario: usuario, usuarioName: usuarioName });
  }

  stopTyping(usuario: string, usuarioName: string): void {
    this.socket.emit('stop-typing', { usuario: usuario, usuarioName: usuarioName });
  }
  onUserTyping(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('user-typing', (data) => {
        observer.next(data);
      });
    });
  }

  onUserStopTyping(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('user-stop-typing', (data) => {
        observer.next(data);
      });
    });
  }

  getMessages(): Observable<Mensaje> {
    return new Observable((observer) => {
      this.socket.on('message', (data: Mensaje) => {
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  presentation(me:Handshake) : void {
    me.socketId = (this.socket.id)!;
    this.socket.emit('handshake',me);
  }

  onList(): Observable<Handshake[]> {
    return new Observable((observer) => {
      this.socket.on('list', (data: Handshake[]) => {
        observer.next(data);
      });
    });
  }

  pingList() : void {
    this.socket.emit('list');
  }
}
