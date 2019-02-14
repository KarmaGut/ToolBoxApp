import * as actionType from "./actions";

export function register(account, password) {
    return {
        type: actionType.register,
        payload: {
            account,
            password
        }
    }
}

export function login() {
    return {
        type: actionType.login
    }
}

export function logout() {
    return {
        type: actionType.logout
    }
}