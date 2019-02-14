import { createStackNavigator } from "react-navigation";
import routeConfigs from "./routeConfigs";

const stackNavigatorConfig = {
    initialRouteName: "SignIn"
}

export default createStackNavigator(routeConfigs, stackNavigatorConfig);