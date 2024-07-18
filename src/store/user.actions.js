import { userService } from "../services/user.service.js";
import { socketService } from "../services/socket.service.js";
import { store } from '../store/store.js'

import { SET_USER } from "./user.reducer.js";





export async function login(credentials) {
    try {
        const user = await userService.login(credentials);
        store.dispatch({
            type: SET_USER,
            user
        });
        socketService.login(user._id);
        return user;
    } catch (err) {
        console.log('Cannot login', err);
        throw err;
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials);
        store.dispatch({
            type: SET_USER,
            user
        });
        socketService.login(user._id);
        return user;
    } catch (err) {
        console.log('Cannot signup', err);
        throw err;
    }
}

export async function logout() {
    try {
        await userService.logout();
        store.dispatch({
            type: SET_USER,
            user: null
        });
        socketService.logout();
    } catch (err) {
        console.log('Cannot logout', err);
        throw err;
    }
}
