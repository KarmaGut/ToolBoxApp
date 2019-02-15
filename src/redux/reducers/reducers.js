import { actionType } from "@actions";

const initialState = {
    loginStatus: "LOGOUT",
    accounts: [{
        account: "admin",
        password: "123456"
    }]
};

export const loginStatus = (store = initialState, action) => {
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
            const { account, password } = action.payload;
            return {
                ...store,
                loginStatus: "LOGIN",
                accounts: [
                    ...store.accounts,
                    {
                        account,
                        password
                    }
                ]
            }
        default : 
            return store;
    }
}
