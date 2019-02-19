import React, { Component } from "react";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";

const ButtonComp = props => {
	const {
		buttonTitle,
		buttonBgColor,
		buttonWidth,
		buttonHeight,
		customButtonStyle,
		textSize,
		textStyle,
		onPressFunc
	} = props;

	return (
		<Button
			title={buttonTitle}
			buttonStyle={{
				backgroundColor: buttonBgColor,
				width: buttonWidth,
				height: buttonHeight,
				borderRadius: buttonHeight / 2,
				...customButtonStyle
			}}
			textStyle={{ fontSize: textSize, ...textStyle }}
			// color="#fff"
			onPress={onPressFunc}
		/>
	);
};

Button.propTypes = {
	buttonTitle: PropTypes.string,
	buttonBgColor: PropTypes.string,
	buttonWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	buttonHeight: PropTypes.number,
	customButtonStyle: PropTypes.object,
	textSize: PropTypes.number,
	textStyle: PropTypes.object,
	onPressFunc: PropTypes.func
};

Button.defaultProps = {
    buttonWidth: "100%",
	customButtonStyle: {},
	textSize: 18,
	textStyle: {},
	onPressFunc: () => {}
};

export default ButtonComp;
