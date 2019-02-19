import React, { Component } from "react";
import { Provider } from "react-redux";
import RootRoute from "@routes";
import { store, persistor } from "@redux";
import { PersistGate } from "redux-persist/integration/react";
import { LeftDrawer } from "@utilityComp";
import DrawerContent from "@DrawerContent";
import Toast from "react-native-easy-toast";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";

export default class RootComponent extends Component {
    constructor(props) {
        super(props);
        this.toast = null;
        this.state = {
            toastPosition: "bottom"
        };
        this._logCurrentStore = this._logCurrentStore.bind(this);
    }

    _logCurrentStore() {
        console.log("state改变，当前的state对象为：", store.getState());
    }

    componentDidMount() {
        // 根组件中添加监听事件，监听store的变化，并持久化store对象
        this.unsubscribe = store.subscribe(this._logCurrentStore);

        this.listenToastShouldShow = RCTDeviceEventEmitter.addListener(
			"TOAST_SHOW",
			({
				Comp,
				position = "bottom",
				delayTime = 100,
				delayFunc = () => {}
			}) => {
				console.log("Toast弹出");
				if (position !== "bottom") {
					this.setState(
						{
							toastPosition: position
						},
						() => {
							this.toast.show(Comp, delayTime, delayFunc);
						}
					);
				} else {
					this.toast.show(Comp, delayTime, delayFunc);
				}
			}
		);
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.listenToastShouldShow.remove();
    }

    render() {
        const { toastPosition } = this.state;

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <LeftDrawer contentComp={<DrawerContent />} >
                        <RootRoute />
                        <Toast
                            ref={toast => (this.toast = toast)}
                            position={toastPosition}
                            style={{
                                // 不设宽度，让其自适应
                                // width: 150,
                                // 设置一个最小宽度
                                minWidth: 150,
                                paddingHorizontal: 10,
                                height: 45,
                                borderRadius: 5,
                                backgroundColor: "#4C4C4C"
                            }}
                            fadeInDuration={750}
                            fadeOutDuration={1000}
                            opacity={0.9}
                        />
                    </LeftDrawer>
                </PersistGate>
            </Provider>
        )
    }
}