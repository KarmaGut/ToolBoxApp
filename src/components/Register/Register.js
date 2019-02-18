import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Header } from "@utilityComp";
import I18n from "@languages";
import { SimpleLineIcon } from "@Icons";
import { RadiusInput, ButtonComp, AlertDialog } from "@utilityComp";
import { errorCode, userNameReg } from "@validator";
import { connect } from "react-redux";
import { actionCreator } from "@actions";

class Register extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.state = {
            userName: "",
            password: "",
            confirmPassword: "",
            lockName: "lock-open"
        };
        this._getUserName = this._getUserName.bind(this);
        this._getPassword = this._getPassword.bind(this);
        this._getConfirmPassword = this._getConfirmPassword.bind(this);
        this._register = this._register.bind(this);
        this._registerValidator = this._registerValidator.bind(this);
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

    _getConfirmPassword(confirmPassword) {
        confirmPassword.length > 0 ? 
            this.setState({
                lockName: "lock",
                confirmPassword
            })
        : 
            this.setState({
                lockName: "lock-open",
                confirmPassword
            })
    }

    _registerValidator() {
        const { accountsObj } = this.props;
        const { userName, password, confirmPassword } = this.state;
        // 昵称非空校验
        if (userName === "") {
            this.alert.current.show(errorCode["50"]);
            return false;
        }

        // 昵称格式校验
        if (!userNameReg.test(userName)) {
            this.alert.current.show(errorCode["51"]);
            return false;
        }

        console.log(accountsObj);
        // 昵称是否已经注册校验
        if (userName in accountsObj) {
            this.alert.current.show(errorCode["52"]);
            return false;
        }

        // 昵称长度校验
        if (userName.length > 12) {
            this.alert.current.show(errorCode["53"]);
            return false;
        }

        // 密码非空校验
        if (password === "") {
            this.alert.current.show(errorCode["54"]);
            return false;
        }

        // 密码长度校验
        if (password.length < 8) {
            this.alert.current.show(errorCode["55"]);
            return false;
        }

        // 确认密码非空校验
        if (confirmPassword === "") {
            this.alert.current.show(errorCode["56"]);
            return false;
        }

        // 确认密码长度校验
        if (confirmPassword.length < 8) {
            this.alert.current.show(errorCode["57"]);
            return false;
        }

        // 密码与确认密码匹配校验
        if (password !== confirmPassword) {
            this.alert.current.show(errorCode["58"]);
            return false;
        }

        // 注册字段通过所有校验
        return true;
    }

    _register() {
        const { userName, password } = this.state;
        const { registerDispatch } = this.props;
        if (this._registerValidator()) {
            // 注册字段校验成功，派发注册action
            registerDispatch(actionCreator.register(userName, password));
        }

        return ;
    }

	render() {
        const { navigation } = this.props;
        const { goBack } = navigation;
        const { lockName } = this.state;

		return (
			<View style={{ flex: 1 }}>
				<Header
					headerTitle={I18n.t("Register")}
					leftPressFunc={() => {
						goBack();
					}}
					leftComp={<Image source={require("@images/back.png")} />}
				/>
				<View style={{ flex: 1, backgroundColor: "rgb(46, 50, 70)" }}>
					<View style={{ flex: 1 }} />
					<View style={{ flex: 1, paddingHorizontal: 20 }}>
						<RadiusInput
							placeholder="昵称"
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
                            customContainerStyle={{
                                marginBottom: 10
                            }}
                            onChangeFunc={this._getPassword}
						/>
                        <RadiusInput
							placeholder="确认密码"
                            LeftIcon={<SimpleLineIcon name={lockName} size={26} color="rgb(87, 95, 132)" />}
                            // keyboardType="numeric"
                            secureTextEntry={true}
                            onChangeFunc={this._getConfirmPassword}
						/>
					</View>
					<View style={{ flex: 1, paddingHorizontal: 20 }}>
                        <ButtonComp 
                            buttonTitle="注册"
                            buttonBgColor="rgb(87, 95, 132)"
                            buttonHeight={50}
                            onPressFunc={this._register}
                        />
                    </View>
				</View>
                <AlertDialog ref={this.alert} />
			</View>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
    return {
        accountsObj: store.store.accounts
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerDispatch(registerAction) {
            dispatch(registerAction);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);