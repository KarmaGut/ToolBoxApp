import React, { Component } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header } from "@utilityComp";
import { SimpleLineIcon } from "@Icons";
import i18n from "@languages";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";

class PwManagement extends Component {
	constructor(props) {
		super(props);
		this._leftPressFunc = this._leftPressFunc.bind(this);
		this._rightPressFunc = this._rightPressFunc.bind(this);
	}

	_leftPressFunc() {
        // 左侧抽屉栏弹出
        RCTDeviceEventEmitter.emit("LEFT_DRAWER_SHOW");
	}

	_rightPressFunc() {}

	componentDidMount() {
        const { navigation } = this.props;
        const { navigate } = navigation;

        // 监听LOGOUT事件，并路由到SignIn页面
		this.listenLogout = RCTDeviceEventEmitter.addListener("LOGOUT", () => {
            navigate("SignIn");
        });

        // 监听FORGET_PASSWORD事件，并路由到ForgetPassword页面
        this.listenForget = RCTDeviceEventEmitter.addListener("FORGET_PASSWORD", () => {
            navigate("ForgetPassword");
        });
    }
    
    componentWillUnmount() {
        this.listenLogout.remove();
        this.listenForget.remove();
    }

	render() {
		return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    headerTitle={i18n.t("PwManagement.pwManagement")}
                    leftPressFunc={this._leftPressFunc}
                    leftComp={<SimpleLineIcon name="list" size={26} color="#000" />}
                    rightPressFunc={this._rightPressFunc}
                    rightComp={<SimpleLineIcon name="plus" size={26} color="#000" />}
                />
                <View style={{ flex: 1 }}>
                    <Text>密码管理</Text>
                </View>
            </SafeAreaView>
		);
	}
}

export default PwManagement;
