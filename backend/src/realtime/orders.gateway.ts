import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3001', 'http://localhost:3002'] },
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    client.emit('connected', { service: 'Food24h realtime' });
  }

  handleDisconnect() {}

  publishOrderUpdate(orderId: string, status: string) {
    this.server?.to(`order:${orderId}`).emit('order.updated', { orderId, status });
  }
}
