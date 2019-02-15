import React, { Component } from "react";
import { View, Platform, StatusBar } from "react-native";

export const STATUS_BAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 20;

export function fixStatusBar() {
	if (Platform.OS === "android") {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor("transparent");
	} else {
		return;
	}
}

export function setStatusBar(isDarkStyle = true) {
	if (Platform.OS === "android") {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor("transparent");
		if (isDarkStyle) {
			StatusBar.setBarStyle("dark-content");
		} else {
			StatusBar.setBarStyle("light-content");
		}
	} else {
		StatusBar.setBarStyle("dark-content");
	}
}

export default class StatusBarComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLightStyle: this.props.isLightStyle ? true : false,
			setBgColor: this.props.setBgColor ? this.props.setBgColor : "transparent"
		};
	}

	render() {
		const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
		const { isLightStyle, setBgColor } = this.state;

		if (Platform.OS === "android") {
			return (
				<View
					style={{ height: STATUS_BAR_HEIGHT, backgroundColor: setBgColor }}
				>
					<StatusBar
						translucent={true}
						backgroundColor="transparent"
						barStyle={isLightStyle ? "light-content" : "dark-content"}
					/>
				</View>
			);
		} else {
			// ios情况不做处理（StatusBar）
			return null;
		}
	}
}
