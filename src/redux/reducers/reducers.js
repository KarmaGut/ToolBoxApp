import state from "@state";
import { actionType } from "@actions";

export function loginStatus(state = state, action) {
    switch(action) {
        case action.type === actionType.login :
            return {
                ...state,
                loginStatus: "LOGIN"
            }
        case action.type === actionType.logout :
            return {
                ...state,
                loginStatus: "LOGOUT"
            }
        case action.type === actionType.register :
            const { account, password } = action.payload;
            return {
                ...state,
                loginStatus: "LOGIN",
                accounts: [
                    ...state.accounts,
                    {
                        account,
                        password
                    }
                ]
            }
        default : 
            return state;
    }
}