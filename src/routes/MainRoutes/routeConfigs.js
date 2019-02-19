import SubMainTab from "@SubMainTab";
import ForgetPassword from "@ForgetPassword";

export default (routeConfigs = {
	SubMainTab: {
		screen: SubMainTab,
		navigationOptions: {
			headTitles: "SubMainTab",
			header: null
		}
    },
    ForgetPassword: {
		screen: ForgetPassword,
		navigationOptions: {
			headTitles: "ForgetPassword",
			header: null
		}
	}
});
