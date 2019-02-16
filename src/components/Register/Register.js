import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Header } from "@utilityComp";
import I18n from "@languages";
import { SimpleLineIcon } from "@Icons";
import { RadiusInput, ButtonComp } from "@utilityComp";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            confirmPassword: "",
            lockName: "lock-open"
        };
        this._getUserName = this._getUserName.bind(this);
        this._getPassword = this._getPassword.bind(this);
        this._getConfirmPassword = this._getConfirmPassword.bind(this);
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
                        />
                    </View>
				</View>
			</View>
		);
	}
}