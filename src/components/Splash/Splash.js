import React, { Component } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";

const mapStateToProps = (store, ownProps) => {
    return {
        loginStatus: store.store.loginStatus
    }
}

class Splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { loginStatus, navigation } = this.props;
        console.log("aaaa", loginStatus);
        if (loginStatus === "LOGIN") {
            navigation.navigate("SubMainTab");
        } else if (loginStatus === "LOGOUT") {
            navigation.navigate("SignIn");
        } else {
            navigation.navigate("SubMainTab");
        }
    }

    render () {
        return (
            <SafeAreaView>
                <Text>这是过渡页</Text>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps)(Splash);

