import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Header } from "@utilityComp";
import I18n from "@languages";

export default class SignIn extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header
					headerTitle={I18n.t("LoginRegister")}
					leftPressFunc={() => {
						console.log("左组件按下");
					}}
					leftComp={<Image source={require("@images/back.png")} />}
					rightPressFunc={() => {
						console.log("右组件按下");
					}}
					rightComp={<Image source={require("@images/back.png")} />}
				/>
				<View style={{ flex: 1 }}>
					<Text>这是登录，注册页面</Text>
				</View>
			</View>
		);
	}
}
