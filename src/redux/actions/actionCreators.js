import * as actionType from "./actions";

// 注册
export const register = (userName, password, imgSrc, answer, question) => {
    return {
        type: actionType.register,
        payload: {
            [userName]: {
                password,
                imgSrc,
                answer,
                question
            }
        }
    }
}

// 登录
export const login = (userName) => {
    return {
        type: actionType.login,
        payload: {
            userName
        }
    }
}

// 登出
export const logout = () => {
    return {
        type: actionType.logout
    }
}

// 忘记密码
export const modifyPassword = (newPassword) => {
    return {
        type: actionType.modifyPassword,
        payload: {
            newPassword
        }
    }
}