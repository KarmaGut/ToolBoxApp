import SignIn from "@SignIn";
import Register from "@Register";

export default routeConfigs = {
    SignIn: {
		screen: SignIn,
		navigationOptions: {
			headTitles: "SignIn",
			header: null
		}
    },
    Register: {
		screen: Register,
		navigationOptions: {
			headTitles: "Register",
			header: null
		}
	}
}