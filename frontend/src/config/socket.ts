import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5000";

const socketOptions: any = {
    autoConnect: true,
    reconnectionDelayMax: 1000,
};

export const socket = io(SERVER_URL, socketOptions);