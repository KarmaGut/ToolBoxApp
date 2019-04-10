import routeConfigs from "./routeConfigs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const MaterialBottomTabNavigatorConfig = {
	initialRouteName: "TodoList",
	// activeColor: "#f0edf6",
	// inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "rgb(46, 50, 70)" }
};

export default createMaterialBottomTabNavigator(routeConfigs, MaterialBottomTabNavigatorConfig);
