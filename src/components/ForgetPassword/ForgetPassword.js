import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Header, RadiusInput, ButtonComp, AlertDialog } from "@utilityComp";
import { connect } from "react-redux";
import { MaterialIcon, SimpleLineIcon } from "@Icons";
import { errorCode } from "@validator";
import { actionCreator } from "@actions";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "400",
        color: "rgb(87, 95, 132)"
    }
})

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.state = {
            inputAnswer: "",
            lockname_1: "lock-open",
            lockname_2: "lock-open",
            password: "",
            confirmPassword: ""
        }
        this._getAnswer = this._getAnswer.bind(this);
        this._confirmAnswer = this._confirmAnswer.bind(this);
        this._getPassword = this._getPassword.bind(this);
        this._getConfirmPassword = this._getConfirmPassword.bind(this);
    }

    _getAnswer(inputAnswer) {
        this.setState({
            inputAnswer
        })
    }

    _confirmAnswer() {
        const {accountObjs, currentAccount, modifyPwDispatch, navigation } = this.props;
        const { goBack } = navigation;
        const rightAnswer = accountObjs[currentAccount].answer;
        const { inputAnswer, password, confirmPassword } = this.state;

        // 提示问题答案不能为空
        if (inputAnswer === "") {
            this.alert.current.show(errorCode["150"]);
            return ;
        }

        // 密码非空校验
        if (password === "") {
            this.alert.current.show(errorCode["54"]);
            return false;
        }

        // 密码长度校验
        if (password.length < 8) {
            this.alert.current.show(errorCode["55"]);
            return false;
        }

        // 确认密码非空校验
        if (confirmPassword === "") {
            this.alert.current.show(errorCode["56"]);
            return false;
        }

        // 确认密码长度校验
        if (confirmPassword.length < 8) {
            this.alert.current.show(errorCode["57"]);
            return false;
        }

        // 密码与确认密码匹配校验
        if (password !== confirmPassword) {
            this.alert.current.show(errorCode["58"]);
            return false;
        }

        // 输入的提示问题答案不正确
        if(inputAnswer !== rightAnswer) {
            this.alert.current.show(errorCode["151"]);
            return ;
        }

        // 校验通过，使用重置密码对当前账号的密码进行重置操作
        modifyPwDispatch(actionCreator.modifyPassword(password));

        RCTDeviceEventEmitter.emit("TOAST_SHOW", {
            Comp: (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text style={{ color: "#fff" }}>
                        {"修改成功"}
                    </Text>
                </View>
            ),
            delayTime: 200,
            delayFunc: () => {
                goBack();
            }
        });
    }

    _getPassword(password) {
        password.length > 0 ? this.setState({
            lockname_1: "lock",
            password
        }) : this.setState({
            lockname_1: "lock-open",
            password
        })
    }

    _getConfirmPassword(confirmPassword) {
        confirmPassword.length > 0 ? this.setState({
            lockname_2: "lock",
            confirmPassword
        }) : this.setState({
            lockname_2: "lock-open",
            confirmPassword
        })
    }

    render() {
        const { lockname_1, lockname_2 } = this.state;
        const { navigation, accountObjs, currentAccount } = this.props;
        const { goBack } = navigation;

        const question = accountObjs[currentAccount].question;

        return (
            <View style={{ flex: 1 }}> 
                <Header
                    headerTitle={"密码找回"}
					leftPressFunc={() => {
						goBack();
					}}
					leftComp={<Image source={require("@images/back.png")} />}
                />
                <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: "rgb(46, 50, 70)" }}>
                    <View style={{ minHeight: 80, paddingVertical: 5 }}>
                        <Text style={[styles.text]}>{'请输入以下密码找回问题的答案（"' + question + '"）：'}</Text>
                    </View>
                    <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 5 }}>
                        <RadiusInput
                            placeholder="密码找回问题答案"
                            maxLength={20}
                            LeftIcon={<MaterialIcon name="question-answer" size={26} color="rgb(87, 95, 132)" />}
                            customContainerStyle={{
                                marginBottom: 10
                            }}
                            onChangeFunc={this._getAnswer}
						/>
                        <RadiusInput
                            placeholder="重置密码"
                            secureTextEntry={true}
                            LeftIcon={<SimpleLineIcon name={lockname_1} size={26} color="rgb(87, 95, 132)" />}
                            customContainerStyle={{
                                marginBottom: 10
                            }}
                            onChangeFunc={this._getPassword}
						/>
                        <RadiusInput
                            placeholder="确认重置密码"
                            secureTextEntry={true}
                            maxLength={20}
                            LeftIcon={<SimpleLineIcon name={lockname_2} size={26} color="rgb(87, 95, 132)" />}
                            customContainerStyle={{
                                marginBottom: 10
                            }}
                            onChangeFunc={this._getConfirmPassword}
						/>
                        <ButtonComp 
                            buttonTitle="确认"
                            buttonBgColor="rgb(87, 95, 132)"
                            buttonHeight={50}
                            onPressFunc={this._confirmAnswer}
                        />
                    </View>
                </View>
                <AlertDialog ref={this.alert} />
            </View>
        )
    }
}

const mapStateoToProps = (store, ownProps) => {
    return {
        currentAccount: store.store.currentAccount,
        accountObjs: store.store.accounts
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        modifyPwDispatch(modifyAction) {
            return dispatch(modifyAction);
        }
    }
};

export default connect(mapStateoToProps, mapDispatchToProps)(ForgetPassword);