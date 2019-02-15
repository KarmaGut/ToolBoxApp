import routeConfigs from "./routeConfigs";
import { createStackNavigator } from "react-navigation";

const stackNavigatorConfig = {
    initialRouteName: "MainStackPage"
}

export default createStackNavigator(routeConfigs, stackNavigatorConfig);

