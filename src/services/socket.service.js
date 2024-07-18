import io from 'socket.io-client';
import { userService } from './user.service';

// Chat
export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg';
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg';
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic';

// User list
export const SOCKET_EVENT_USERS_IN_ROOM = 'users-in-room';

export const SOCKET_EMIT_LOGIN = 'set-user-socket';
export const SOCKET_EMIT_LOGOUT = 'unset-user-socket';

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030';

let socket = null;

export const socketService = {
    setup() {
        if (!socket) {
            socket = io(baseUrl);
        }
    },
    connect(user) {
        if (!socket) this.setup();
        socket.emit(SOCKET_EMIT_LOGIN, user);
    },
    disconnect() {
        if (socket) socket.emit(SOCKET_EMIT_LOGOUT);
    },
    on(eventName, cb) {
        if (!socket) this.setup();
        socket.on(eventName, cb);
    },
    off(eventName, cb = null) {
        if (!socket) return;
        if (!cb) socket.removeAllListeners(eventName);
        else socket.off(eventName, cb);
    },
    emit(eventName, data) {
        if (!socket) throw new Error('Socket not initialized');
        socket.emit(eventName, data);
    },
    login(user) {
        this.connect(user);
    },
    logout() {
        this.disconnect();
    },
    terminate() {
        socket = null;
    },
};

// for debugging from console
window.socketService = socketService;
