import * as actionType from "./actions";

export const register = (account, password) => {
    return {
        type: actionType.register,
        payload: {
            account,
            password
        }
    }
}

export const login = () => {
    return {
        type: actionType.login
    }
}

export const logout = () => {
    return {
        type: actionType.logout
    }
}