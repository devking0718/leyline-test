import { io } from "socket.io-client";

const SERVER_URL:string = String(process.env.SERVER_URL);

const socketOptions: any = {
    autoConnect: true,
    reconnectionDelayMax: 1000,
};

export const socket = io(SERVER_URL, socketOptions);