import React, { Component } from "react";
import { View, Text } from "react-native";

class TodoList extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>这是待办事项</Text>
            </View>
        )
    }
}

export default TodoList;