import routeConfigs from "./routeConfigs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const MaterialBottomTabNavigatorConfig = {
	initialRouteName: "TodoList",
	activeColor: "#f0edf6",
	inactiveColor: "#3e2465",
	barStyle: { backgroundColor: "#694fad" }
};

export default createMaterialBottomTabNavigator(routeConfigs, MaterialBottomTabNavigatorConfig);
