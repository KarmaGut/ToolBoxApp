import { actionType } from "@actions";

let initialState = {
    loginStatus: "LOGOUT",
    currentAccount: "admin",
    accounts: {
        "admin": {
            password: "372574152",
            imgSrc: require("@images/profileImage_11.png"),
            question: "您的QQ号是多少？",
            answer: "372574152"
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
                loginStatus: "LOGIN",
                currentAccount: action.payload.userName
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
                currentAccount: Object.keys(action.payload)[0],
                accounts: {
                    ...store.accounts,
                    ...action.payload
                },
                profileImages: store.profileImages.length === 0 ? [] : store.profileImages.slice(1)
            }
        case actionType.modifyPassword :
            const { currentAccount, accounts } = store;
            const currentAccountObj = accounts[currentAccount];
            
            return {
                ...store,
                accounts: {
                    ...store.accounts,
                    [currentAccount]: {
                        ...currentAccountObj,
                        password: action.payload.newPassword
                    }
                }
            }
        default : 
            return store;
    }
}
