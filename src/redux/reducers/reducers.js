import { actionType } from "@actions";

let initialState = {
    loginStatus: "LOGOUT",
    accounts: {
        "admin": {
            password: "123456",
            imgSrc: require("@images/profileImage_11.png")
        }
    },
    profileImages: [
        require("@images/profileImage_1.png"),
        require("@images/profileImage_2.png"),
        require("@images/profileImage_3.png"),
        require("@images/profileImage_4.png"),
        require("@images/profileImage_5.png"),
        require("@images/profileImage_6.png"),
        require("@images/profileImage_7.png"),
        require("@images/profileImage_8.png"),
        require("@images/profileImage_9.png"),
        require("@images/profileImage_10.png")
    ]
};

export const publicReducer = (store = initialState, action) => {
    switch(action.type) {
        case actionType.login :
            return {
                ...store,
                loginStatus: "LOGIN"
            }
        case actionType.logout :
            return {
                ...store,
                loginStatus: "LOGOUT"
            }
        case actionType.register :
            return {
                ...store,
                loginStatus: "LOGIN",
                accounts: {
                    ...store.accounts,
                    ...action.payload
                }
            }
        default : 
            return store;
    }
}
