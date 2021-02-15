/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface ExtractedRoomsObject {
  socketID: string;
  roomName: string;
}

const extractRoomsSet = (socketRooms: Set<string>): ExtractedRoomsObject => {
  const values = socketRooms.values();
  const socketID = values.next().value;
  const roomName = values.next().value;
  return { socketID, roomName };
};

export default { extractRoomsSet };
