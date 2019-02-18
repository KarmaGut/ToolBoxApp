import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import i18n from "@languages";
import { connect } from "react-redux";
import { actionCreator } from "@actions";

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
    }
});

class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
    }

    _logout() {
        const { logoutDispatch, navigation } = this.props;
        logoutDispatch(actionCreator.logout());
        console.log(navigation);
    }

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				{/* <Text>Drawer</Text> */}
				<View style={[styles.centerBottom, { flex: 2, backgroundColor: "#694fad" }]} >
                    <Text style={[styles.settingText]}>{i18n.t("DrawerContent.settings")}</Text>
                </View>
				<View style={{ flex: 18 }} />
                <TouchableOpacity style={[styles.center, { height: 64, backgroundColor: "#694fad" }]} onPress={this._logout}>
                    <Text style={[styles.settingText]}>{i18n.t("DrawerContent.logout")}</Text>
                </TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logoutDispatch(logoutAction) {
            dispatch(logoutAction);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
