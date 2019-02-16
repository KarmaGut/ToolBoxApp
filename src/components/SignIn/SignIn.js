import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Header } from "@utilityComp";
import I18n from "@languages";
import { FontAweIcon, SimpleLineIcon } from "@Icons";
import { RadiusInput, ButtonComp } from "@utilityComp";

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            lockName: "lock-open"
        };
        this._getUserName = this._getUserName.bind(this);
        this._getPassword = this._getPassword.bind(this);
        this._signIn = this._signIn.bind(this);
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

    _signIn() {
        const { userName, password } = this.state;
    }

	render() {
		const { navigation } = this.props;
        const { navigate } = navigation;
        const { lockName } = this.state;

		return (
			<View style={{ flex: 1 }}>
				<Header
					headerTitle={I18n.t("Login")}
					rightPressFunc={() => {
						navigate("Register");
					}}
					rightComp={<FontAweIcon name="registered" size={26} />}
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
                            onChangeFunc={this._getPassword}
						/>
					</View>
					<View style={{ flex: 1, paddingHorizontal: 20 }}>
                        <ButtonComp 
                            buttonTitle="登录"
                            buttonBgColor="rgb(87, 95, 132)"
                            buttonHeight={50}
                            onPressFunc={this._signIn}
                        />
                    </View>
				</View>
			</View>
		);
	}
}
