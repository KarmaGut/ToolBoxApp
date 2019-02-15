import React, { Component } from "react";
import { View, Text } from "react-native";
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
            navigation.navigate("");
        } else if (loginStatus === "LOGOUT") {
            navigation.navigate("SignIn");
        } else {
            navigation.navigate("");
        }
    }

    render () {
        return (
            <View>
                <Text>这是过渡页</Text>
            </View>
        )
    }
}

export default connect(mapStateToProps)(Splash);

