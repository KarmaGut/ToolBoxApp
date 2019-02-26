import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header } from "@utilityComp";
import I18n from "@languages";
import { AntdIcon, SimpleLineIcon } from "@Icons";
import { RadiusInput, ButtonComp, AlertDialog } from "@utilityComp";
import { errorCode, userNameReg } from "@validator";
import { connect } from "react-redux";
import { actionCreator } from "@actions";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.state = {
            userName: "",
            password: "",
            lockName: "lock-open"
        };
        this._getUserName = this._getUserName.bind(this);
        this._getPassword = this._getPassword.bind(this);
        this._signIn = this._signIn.bind(this);
        this._loginValidator = this._loginValidator.bind(this);
    }

    _getUserName(userName) {
        this.setState({
            userName
        })
    }

    _getPassword(password) {
        password.length > 0 ? 
            this.setState({
                lockName: "lock",
                password
            })
        : 
            this.setState({
                lockName: "lock-open",
                password
            })
    }

    _loginValidator() {
        const { accountsObj } = this.props;
        const { userName, password } = this.state;
        // 昵称非空校验
        if (userName === "") {
            this.alert.current.show(errorCode["00"]);
            return false;
        }

        // 昵称格式校验
        if (!userNameReg.test(userName)) {
            this.alert.current.show(errorCode["01"]);
            return false;
        }

        // 昵称是否存在校验
        if (!(userName in accountsObj)) {
            this.alert.current.show(errorCode["02"]);
            return false;
        }

        // 昵称长度校验
        if (userName.length > 8) {
            this.alert.current.show(errorCode["03"]);
            return false;
        }

        // 密码非空校验
        if (password === "") {
            this.alert.current.show(errorCode["05"]);
            return false;
        }

        // 密码长度校验
        if (password.length < 8) {
            this.alert.current.show(errorCode["06"]);
            return false;
        }

        // 昵称与密码匹配校验（需对用户的密码加密后正向匹配）
        if (password !== accountsObj[userName].password) {
            this.alert.current.show(errorCode["07"]);
            return false;
        }

        // 通过所有校验
        return true;
    }

    _signIn() {
        const { loginDispatch, navigation } = this.props;
        const { userName } = this.state;

        if (this._loginValidator()) {
            // 派发登录action
            loginDispatch(actionCreator.login(userName));
            RCTDeviceEventEmitter.emit("TOAST_SHOW", {
                Comp: (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ color: "#fff" }}>
                            {"登录成功"}
                        </Text>
                    </View>
                ),
                delayTime: 200,
                delayFunc: () => {
                    navigation.navigate("SubMainTab");
                }
            });
        }

        return ;
    }

	render() {
		const { navigation } = this.props;
        const { navigate } = navigation;
        const { lockName } = this.state;

		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Header
					headerTitle={I18n.t("Login")}
					rightPressFunc={() => {
						navigate("Register");
					}}
					rightComp={<AntdIcon name="login" size={24} color="#000" />}
				/>
				<View style={{ flex: 1, backgroundColor: "rgb(46, 50, 70)" }}>
					<View style={{ flex: 1 }} />
					<View style={{ flex: 1, paddingHorizontal: 20 }}>
						<RadiusInput
                            placeholder="昵称"
                            maxLength={8}
                            LeftIcon={<SimpleLineIcon name="user" size={26} color="rgb(87, 95, 132)" />}
                            customContainerStyle={{
                                marginBottom: 10
                            }}
                            onChangeFunc={this._getUserName}
						/>
                        <RadiusInput
							placeholder="密码"
                            LeftIcon={<SimpleLineIcon name={lockName} size={26} color="rgb(87, 95, 132)" />}
                            // keyboardType="numeric"
                            secureTextEntry={true}
                            onChangeFunc={this._getPassword}
						/>
					</View>
					<View style={{ flex: 1, paddingHorizontal: 20 }}>
                        <ButtonComp 
                            buttonTitle={"登录"}
                            buttonBgColor="rgb(87, 95, 132)"
                            buttonHeight={50}
                            onPressFunc={this._signIn}
                        />
                    </View>
				</View>
                <AlertDialog ref={this.alert} />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (store) => {
    return {
        accountsObj: store.store.accounts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginDispatch(loginAction) {
            dispatch(loginAction);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
