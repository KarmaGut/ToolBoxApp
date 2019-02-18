import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import StatusBarComp, { STATUS_BAR_HEIGHT } from "./StatusBarComp";

const styles = StyleSheet.create({
	flexDirRow: {
		flexDirection: "row"
	},
	justiContCenter: {
		justifyContent: "center"
	},
	leftCenter: {
		justifyContent: "center",
		alignItems: "flex-end"
	},
	headerCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	textCenter: {
		fontWeight: "400",
		fontSize: 22,
		color: "#1D213B"
	}
});

const Header = props => {
	const {
		navigation,
		headerHeight,
		headerBgColor,
		headerBorderBottomColor,
		headerBorderBottomWidth,
		headerPaddingHorizontal,
		headerTitle,
		headerLeftWidth,
		leftPressFunc,
		leftComp,
		headerRightWidth,
		rightPressFunc,
        rightComp,
        customStyle,
        statusBarBgColor
	} = props;
	const { goBack } = navigation;

	_renderLeft = () => {
		if (leftPressFunc) {
			return (
				<TouchableOpacity
					style={[
						styles.justiContCenter,
						{
							height: headerHeight,
							width: headerLeftWidth
						}
					]}
					onPress={leftPressFunc}
				>
					{leftComp}
				</TouchableOpacity>
			);
		} else {
			return (
				<View
					style={[
						styles.justiContCenter,
						{
							height: headerHeight,
							width: headerLeftWidth
						}
					]}
				>
					{leftComp}
				</View>
			);
		}
	};

	_renderRight = () => {
		if (rightPressFunc) {
			return (
				<TouchableOpacity
					style={[
						styles.leftCenter,
						{
							height: headerHeight,
							width: headerRightWidth
						}
					]}
					onPress={rightPressFunc}
				>
					{rightComp}
				</TouchableOpacity>
			);
		} else {
			return (
				<View
					style={[
						styles.leftCenter,
						{
							height: headerHeight,
							width: headerLeftWidth
						}
					]}
				>
					{rightComp}
				</View>
			);
		}
	};

	return (
        <View style={{ 
            height: STATUS_BAR_HEIGHT + headerHeight
        }}>
            <StatusBarComp setBgColor={statusBarBgColor === "" ? headerBgColor : statusBarBgColor} />
            <View
                style={[
                    styles.flexDirRow,
                    {
                        height: headerHeight,
                        backgroundColor: headerBgColor,
                        borderBottomColor: headerBorderBottomColor,
                        borderBottomWidth: headerBorderBottomWidth,
                        paddingHorizontal: headerPaddingHorizontal,
                        ...customStyle
                    }
                ]}
            >
                {_renderLeft()}
                <View style={[styles.headerCenter]}>
                    <Text style={[styles.textCenter]}>{headerTitle}</Text>
                </View>
                {_renderRight()}
            </View>
        </View>
	);
};

Header.propTypes = {
	// headerContainer样式
	headerHeight: PropTypes.number,
	headerBgColor: PropTypes.string,
	headerBorderBottomColor: PropTypes.string,
	headerBorderBottomWidth: PropTypes.number,
    headerPaddingHorizontal: PropTypes.number,
    customStyle: PropTypes.object,

	// headerLeft
	headerLeftWidth: PropTypes.number,
	leftPressFunc: PropTypes.func,
	leftComp: PropTypes.node,

	// headerRight
	headerRightWidth: PropTypes.number,
	rightPressFunc: PropTypes.func,
	rightComp: PropTypes.node,

	// headerTitle
    headerTitle: PropTypes.string,
    
    // statusBar
    statusBarBgColor: PropTypes.string
};

Header.defaultProps = {
	// headerContainer默认样式
	headerHeight: 50,
	headerBgColor: "#FCFDFE",
	headerBorderBottomColor: "#EAEAEA",
	headerBorderBottomWidth: 1,
	headerPaddingHorizontal: 20,

	// headerLeft
	headerLeftWidth: 50,

	// headerRight
    headerRightWidth: 50,
    
    statusBarBgColor: ""
};

export default withNavigation(Header);
