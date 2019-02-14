import Splash from "@Splash";
import MainRoutes from "@MainRoutes";
import SignInRoutes from "@SignInRoutes";

import { createSwitchNavigator, createAppContainer } from "react-navigation";

const routeConfigs = {
    Splash,
    MainRoutes,
    SignInRoutes
};

const switchNavigatorConfig = {
    initialRouteName: "Splash"
};

export default createAppContainer(createSwitchNavigator(routeConfigs, switchNavigatorConfig));