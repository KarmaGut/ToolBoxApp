import React, { Component } from "react";
import { Provider } from "react-redux";
import RootRoute from "@routes";
import { store, persistor } from "@redux";
import { PersistGate } from "redux-persist/integration/react";
import { LeftDrawer } from "@utilityComp";
import DrawerContent from "@DrawerContent";

export default class RootComponent extends Component {
    constructor(props) {
        super(props);
        this._logCurrentStore = this._logCurrentStore.bind(this);
    }

    _logCurrentStore() {
        console.log("state改变，当前的state对象为：", store.getState());
    }

    componentDidMount() {
        // 根组件中添加监听事件，监听store的变化，并持久化store对象
        this.unsubscribe = store.subscribe(this._logCurrentStore);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <LeftDrawer contentComp={<DrawerContent />} >
                        <RootRoute />
                    </LeftDrawer>
                </PersistGate>
            </Provider>
        )
    }
}