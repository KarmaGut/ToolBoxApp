import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import i18n from "@languages";
import { connect } from "react-redux";
import { actionCreator } from "@actions";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";
import { AlertDialog } from "@utilityComp";

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
	centerBottom: {
		justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 10
    },
    settingText: {
        fontWeight: "400",
		fontSize: 22,
		color: "#fff"
    }
});

class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this._logout = this._logout.bind(this);
    }

    _logout() {
        const { logoutDispatch } = this.props;
        logoutDispatch(actionCreator.logout());
        this.alert.current.show("确认退出登录？", "确认", () => {
            // 关闭左侧抽屉栏
            RCTDeviceEventEmitter.emit("LEFT_DRAWER_CLOSE");
            // 路由到登录页面
            RCTDeviceEventEmitter.emit("LOGOUT");
        }, 0.8, 0.2, () => {}, true, "取消");
    }

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				<View style={[styles.centerBottom, { flex: 2, backgroundColor: "#694fad" }]} >
                    <Text style={[styles.settingText]}>{i18n.t("DrawerContent.settings")}</Text>
                </View>
				<View style={{ flex: 18 }} />
                <TouchableOpacity style={[styles.center, { height: 64, backgroundColor: "#694fad" }]} onPress={this._logout}>
                    <Text style={[styles.settingText]}>{i18n.t("DrawerContent.logout")}</Text>
                </TouchableOpacity>
                <AlertDialog ref={this.alert} />
			</View>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logoutDispatch(logoutAction) {
            dispatch(logoutAction);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
