import routeConfigs from "./routeConfigs";
import { createStackNavigator } from "react-navigation";

const stackNavigatorConfig = {
    // initialRouteName: ""
}

export default createStackNavigator(routeConfigs, stackNavigatorConfig);

