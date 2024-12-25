import { io } from 'socket.io-client';

export const initSocket = async () => {
    const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

    if (!SOCKET_URL) {
        throw new Error("REACT_APP_BACKEND_URL is not defined. Check your environment variables.");
    }

    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io(SOCKET_URL, options);
};
