import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header } from "@utilityComp";
import { SimpleLineIcon } from "@Icons";
import i18n from "@languages";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";

class TodoList extends Component {
	constructor(props) {
		super(props);
		// this.drawer = React.createRef();
		super(props);
		this._leftPressFunc = this._leftPressFunc.bind(this);
		this._rightPressFunc = this._rightPressFunc.bind(this);
	}

	_leftPressFunc() {
        // this.drawer.current.open();
        RCTDeviceEventEmitter.emit("LEFT_DRAWER_SHOW");
	}

	_rightPressFunc() {}

	componentDidMount() {
		console.log("aaa", this.props.navigation);
		// console.log(this.drawer);
	}

	render() {
		return (
			
				<View style={{ flex: 1 }}>
					<Header
						headerTitle={i18n.t("TodoList.todoList")}
						leftPressFunc={this._leftPressFunc}
						leftComp={<SimpleLineIcon name="list" size={26} color="#000" />}
						rightPressFunc={this._rightPressFunc}
						rightComp={<SimpleLineIcon name="plus" size={26} color="#000" />}
					/>
					<View style={{ flex: 1 }}>
						<Text>待办事项</Text>
					</View>
				</View>
			// </LeftDrawer>
		);
	}
}

export default TodoList;
