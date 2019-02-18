import React, { Component } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
	Dimensions
} from "react-native";
import i18n from "@languages";

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#00000040"
	},
	Wrapper: {
		backgroundColor: "#FFFFFF",
		borderRadius: 8
	}
});

export default class AlertDialog extends Component {
	constructor(props) {
		super(props);
		const { width, height } = Dimensions.get("window");
		this.popUp = React.createRef();
		this.state = {
			AlertText: "",
			ConfirmText: "",
			onConfirm: () => {},
			onDismiss: () => {},
			visible: false,
			modalWidth: width * 0.8,
			modalHeight: height * 0.2,
			showCancel: false,
			CancelText: ""
		};
	}

	show(
		AlertText,
		ConfirmText = i18n.t("AlertDialog.confirmText"),
		onConfirm = () => {},
		modalWidthRatios = 0.8,
		modalHeightRatios = 0.2,
		onDismiss = () => {},
		showCancel = false,
		CancelText = i18n.t("AlertDialog.cancelText")
	) {
		const { width, height } = Dimensions.get("window");
		this.setState({
			AlertText,
			ConfirmText,
			onConfirm,
			onDismiss,
			visible: true,
			modalWidth: width * modalWidthRatios,
			modalHeight: height * modalHeightRatios,
			showCancel,
			CancelText
		});
	}

	render() {
		const {
			AlertText,
			ConfirmText,
			onConfirm,
			onDismiss,
			visible,
			modalWidth,
			modalHeight,
			showCancel,
			CancelText
		} = this.state;

		return (
			<Modal
				transparent={true}
				animationType={"fade"}
				visible={visible}
				onRequestClose={onDismiss}
			>
				<View style={styles.modalBackground}>
					<View
						style={[styles.Wrapper, { width: modalWidth, height: modalHeight }]}
					>
						<View style={{ flex: 1 }}>
							<View
								style={{
									flex: 2,
									borderBottomWidth: 1,
									borderBottomColor: "#D6D6D6",
									justifyContent: "center",
									alignItems: "center",
									paddingHorizontal: 6
								}}
							>
								<Text
									style={{
										fontSize: 16,
										fontFamily: "PingFang-SC-Medium",
										color: "#000000",
										textAlign: "center"
									}}
								>
									{AlertText}
								</Text>
							</View>
							<View style={{ flex: 1, flexDirection: "row" }}>
								{showCancel ? (
									<TouchableOpacity
										style={{
											justifyContent: "center",
											alignItems: "center",
											flex: 1,
											width: "100%",
											borderRightWidth: 1,
											borderRightColor: "#D6D6D6"
										}}
										onPress={() => {
											onDismiss();
											this.setState({
												visible: false
											});
										}}
									>
										<Text style={{ fontSize: 16, color: "rgb(87, 95, 132)" }}>
											{CancelText}
										</Text>
									</TouchableOpacity>
								) : (
									<View />
								)}
								<TouchableOpacity
									style={{
										justifyContent: "center",
										alignItems: "center",
										flex: 1,
										width: "100%"
									}}
									onPress={() => {
										onConfirm();
										this.setState({
											visible: false
										});
									}}
								>
									<Text style={{ fontSize: 16, color: "rgb(87, 95, 132)" }}>
										{ConfirmText}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}
