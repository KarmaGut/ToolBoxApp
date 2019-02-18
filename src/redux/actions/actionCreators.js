import * as actionType from "./actions";

export const register = (userName, password) => {
    return {
        type: actionType.register,
        payload: {
            [userName]: {
                password
            }
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