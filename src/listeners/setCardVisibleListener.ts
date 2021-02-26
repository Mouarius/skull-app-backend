import { Socket, Server } from 'socket.io';
import Card from '../model/Card';

export default (_io: Server, socket: Socket): void => {
  socket.on('board/set_card_visible/request', (_card: Card) => {
    //Handle card change
  });
};
