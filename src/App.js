import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "@reducers" ;
import RootRoute from "@routes";

const store = createStore(reducers);

export default class RootComponent extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootRoute />
            </Provider>
        )
    }
}