import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header } from "@utilityComp";
import I18n from "@languages";
import { SimpleLineIcon, MaterialIcon } from "@Icons";
import { RadiusInput, ButtonComp, AlertDialog } from "@utilityComp";
import { errorCode, userNameReg } from "@validator";
import { connect } from "react-redux";
import { actionCreator } from "@actions";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";

class Register extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.state = {
            userName: "",
            password: "",
            confirmPassword: "",
            question: "",
            answer: "",
            lockName_1: "lock-open",
            lockName_2: "lock-open",
            showQue: false
        };
        this._getUserName = this._getUserName.bind(this);
        this._getPassword = this._getPassword.bind(this);
        this._getConfirmPassword = this._getConfirmPassword.bind(this);
        this._register = this._register.bind(this);
        this._registerValidator = this._registerValidator.bind(this);
        this._getQuestion = this._getQuestion.bind(this);
        this._getAnswer = this._getAnswer.bind(this);
    }

    _getUserName(userName) {
        this.setState({
            userName
        })
    }

    _getPassword(password) {
        password.length > 0 ? 
            this.setState({
                lockName_1: "lock",
                password
            })
        : 
            this.setState({
                lockName_1: "lock-open",
                password
            })
    }

    _getConfirmPassword(confirmPassword) {
        confirmPassword.length > 0 ? 
            this.setState({
                lockName_2: "lock",
                confirmPassword
            })
        : 
            this.setState({
                lockName_2: "lock-open",
                confirmPassword
            })
    }

    _getQuestion(question) {
        this.setState({
            question
        });
    }

    _getAnswer(answer) {
        this.setState({
            answer
        })
    }

    _registerValidator() {
        const { accountsObj } = this.props;
        const { userName, password, confirmPassword, question, answer } = this.state;
        // 昵称非空校验
        if (userName === "") {
            this.alert.current.show(errorCode["50"]);
            return false;
        }

        // 昵称格式校验
        if (!userNameReg.test(userName)) {
            this.alert.current.show(errorCode["51"]);
            return false;
        }

        console.log(accountsObj);
        // 昵称是否已经注册校验
        if (userName in accountsObj) {
            this.alert.current.show(errorCode["52"]);
            return false;
        }

        // 昵称长度校验
        if (userName.length > 8) {
            this.alert.current.show(errorCode["53"]);
            return false;
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

        // 提示问题不为空，则答案不能为空
        if (question !== "" && answer === "") {
            this.alert.current.show("提示问题答案不能为空");
            return false;
        }

        // 答案不为空，则问题不能为空
        if (answer !== "" && question === "") {
            this.alert.current.show("提示问题不能为空");
            return false;
        }

        // 注册字段通过所有校验
        return true;
    }

    _register() {
        const { userName, password, question, answer } = this.state;
        const { registerDispatch, profileImages, navigation } = this.props;
        if (this._registerValidator()) {
            let imgSrc = profileImages.length === 0 ? require("@images/profileImage_11.png") : profileImages[0]
            // 注册字段校验成功，派发注册action
            registerDispatch(actionCreator.register(userName, password, imgSrc, question, answer));
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
                            {"注册成功"}
                        </Text>
                    </View>
                ),
                delayTime: 200,
                delayFunc: () => {
                    navigation.navigate("SubMainTab");
                }
            });
        }

        return ;
    }

	render() {
        const { navigation } = this.props;
        const { goBack } = navigation;
        const { lockName_1, lockName_2, showQue } = this.state;

		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Header
					headerTitle={I18n.t("Register")}
					leftPressFunc={() => {
						goBack();
					}}
					leftComp={<Image source={require("@images/back.png")} />}
				/>
				<View style={{ flex: 1, backgroundColor: "rgb(46, 50, 70)" }}>
					<View style={{ flex: 1 }} />
					<View style={{ flex: 4, paddingHorizontal: 20 }}>
						<RadiusInput
                            placeholder="昵称"
                            maxLength={8}
                            LeftIcon={<SimpleLineIcon name="user" size={26} color="rgb(87, 95, 132)" />}
                            customContainerStyle={{
                                marginBottom: 10
                            }}
                            onChangeFunc={this._getUserName}
						/>
                        <RadiusInput
							placeholder="密码"
                            LeftIcon={<SimpleLineIcon name={lockName_1} size={26} color="rgb(87, 95, 132)" />}
                            secureTextEntry={true}
                            customContainerStyle={{
                                marginBottom: 10
                            }}
                            onChangeFunc={this._getPassword}
						/>
                        <RadiusInput
							placeholder="确认密码"
                            LeftIcon={<SimpleLineIcon name={lockName_2} size={26} color="rgb(87, 95, 132)" />}
                            secureTextEntry={true}
                            customContainerStyle={{
                                marginBottom: 10
                            }}
                            onChangeFunc={this._getConfirmPassword}
						/>
                        <View style={{ height: 30, justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 10 }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    showQue: !showQue
                                })
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: "400", color: "rgb(87, 95, 132)"}}>密码提示问题？</Text>
                            </TouchableOpacity>
                        </View>
					{/* </View>
					<View style={{ flex: 2, paddingHorizontal: 20 }}> */}
                        { showQue ? (
                            <View style={{ flex: 1 }}>
                                <RadiusInput
                                    placeholder="密码提示问题（可选）"
                                    maxLength={20}
                                    LeftIcon={<SimpleLineIcon name="question" size={26} color="rgb(87, 95, 132)" />}
                                    customContainerStyle={{
                                        marginBottom: 10
                                    }}
                                    onChangeFunc={this._getQuestion}
                                />
                                <RadiusInput
                                    placeholder="密码提示问题答案（可选）"
                                    maxLength={20}
                                    LeftIcon={<MaterialIcon name="question-answer" size={26} color="rgb(87, 95, 132)" />}
                                    customContainerStyle={{
                                        marginBottom: 10
                                    }}
                                    onChangeFunc={this._getAnswer}
                                />
                            </View>
                        ): (
                            <View />
                        )}
                        <View style={{ flex: 1 }}>
                            <ButtonComp 
                                buttonTitle="注册"
                                buttonBgColor="rgb(87, 95, 132)"
                                buttonHeight={50}
                                onPressFunc={this._register}
                            />
                        </View>
                    </View>
				</View>
                <AlertDialog ref={this.alert} />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
    return {
        accountsObj: store.store.accounts,
        profileImages: store.store.profileImages
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerDispatch(registerAction) {
            dispatch(registerAction);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);