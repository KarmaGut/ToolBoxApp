import routeConfigs from "./routeConfigs";
import { createStackNavigator } from "react-navigation";

const stackNavigatorConfig = {
    initialRouteName: "SubMainTab"
}

export default createStackNavigator(routeConfigs, stackNavigatorConfig);

