import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import i18n from "@languages";
import { connect } from "react-redux";
import { actionCreator } from "@actions";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";
import { AlertDialog, CustmoDivider } from "@utilityComp";
import { Avatar } from "react-native-elements";
import { errorCode } from "@validator";
import { FontAwe5Icon } from "@Icons";

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
	},
	userNameContainer: {
		minHeight: 60,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 5
	},
	userNameText: {
		fontSize: "400",
		fontSize: 18,
		color: "#000",
		marginLeft: 30
	},
	centerText: {
		fontWeight: "400",
		fontSize: 20,
        color: "#000",
        marginLeft: 20
	}
});

class DrawerContent extends Component {
	constructor(props) {
		super(props);
		this.alert = React.createRef();
        this._logout = this._logout.bind(this);
        this._forgetPassword = this._forgetPassword.bind(this);
        this._switchLanguage = this._switchLanguage.bind(this);
	}

	_logout() {
		const { logoutDispatch } = this.props;

		// 关闭左侧抽屉栏（必须先收起左侧抽屉，否则第一次点击会触发抽屉收起，而不是执行以下的onConfirm函数，需要点击两次）
		RCTDeviceEventEmitter.emit("LEFT_DRAWER_CLOSE");

		this.alert.current.show(
			"确认退出登录？",
			"确认",
			() => {
				logoutDispatch(actionCreator.logout());

				RCTDeviceEventEmitter.emit("TOAST_SHOW", {
					Comp: (
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Text style={{ color: "#fff" }}>{"退出成功"}</Text>
						</View>
					),
					delayTime: 200,
					delayFunc: () => {
						RCTDeviceEventEmitter.emit("LOGOUT");
					}
				});
			},
			0.8,
			0.2,
			() => {},
			true,
			"取消"
		);
    }
    
    _forgetPassword() {
        const { accountObjs, currentAccount } = this.props;
        if (accountObjs[currentAccount].answer === "") {
            RCTDeviceEventEmitter.emit("LEFT_DRAWER_CLOSE");
            this.alert.current.show(errorCode["100"]);
        } else {
            RCTDeviceEventEmitter.emit("LEFT_DRAWER_CLOSE");
            RCTDeviceEventEmitter.emit("FORGET_PASSWORD");
        }
    }

    _switchLanguage() {

    }

	render() {
		const { currentAccount, accountObjs } = this.props;

		return (
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				<View
					style={[styles.centerBottom, { flex: 2, backgroundColor: "rgb(46, 50, 70)" }]}
				>
					<Text style={[styles.settingText]}>
						{i18n.t("DrawerContent.settings")}
					</Text>
				</View>
				<View style={{ flex: 18 }}>
					<View style={{ minHeight: 180 }}>
						<View style={[styles.userNameContainer]}>
							<Avatar
								size="medium"
								rounded
								source={accountObjs[currentAccount].imgSrc}
								onPress={() => {}}
								activeOpacity={0.7}
							/>
							<Text style={[styles.userNameText]}>{currentAccount}</Text>
						</View>
						<CustmoDivider bgColor="#DDD9D9" />
						<TouchableOpacity style={[styles.userNameContainer, { minHeight: 60 }]} onPress={this._forgetPassword}>
                            <FontAwe5Icon name="user-lock" size={26} color="rgb(46, 50, 70)" />
							<Text style={[styles.centerText]}>{"忘记密码"}</Text>
						</TouchableOpacity>
						<CustmoDivider bgColor="#DDD9D9" />
						<TouchableOpacity style={[styles.userNameContainer, { minHeight: 60 }]} onPress={this._switchLanguage}>
                            <FontAwe5Icon name="language" size={26} color="rgb(46, 50, 70)" />
                            <Text style={[styles.centerText]}>{"语言切换"}</Text>
						</TouchableOpacity>
						<CustmoDivider bgColor="#DDD9D9" />
					</View>
					<View style={{ flex: 1 }} />
				</View>
				<TouchableOpacity
					style={[styles.center, { height: 64, backgroundColor: "rgb(46, 50, 70)" }]}
					onPress={this._logout}
				>
					<Text style={[styles.settingText]}>
						{i18n.t("DrawerContent.logout")}
					</Text>
				</TouchableOpacity>
				<AlertDialog ref={this.alert} />
			</View>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
	return {
		currentAccount: store.store.currentAccount,
		accountObjs: store.store.accounts
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		logoutDispatch(logoutAction) {
			dispatch(logoutAction);
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DrawerContent);
