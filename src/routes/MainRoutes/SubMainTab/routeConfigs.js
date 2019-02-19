import React from "react";
import Memo from "@Memo";
import PwManagement from "@PwManagement";
import Thoughts from "@Thoughts";
import TodoList from "@TodoList";
import { FontAwe5Icon, MaterialComIcon } from "@Icons";

export default routeConfigs = {
    TodoList: {
        screen: TodoList,
        navigationOptions: ({ navigation }) => {
            return {
                tabBarLabel: "待办事项",
                tabBarIcon: ({ focused }) => {
                    return <FontAwe5Icon name="clipboard-list" size={20} color="#fff" />
                }
            }
        }
    },
    Memo: {
        screen: Memo,
        navigationOptions: ({ navigation }) => {
            return {
                tabBarLabel: "备忘录",
                tabBarIcon: ({ focused }) => {
                    return <FontAwe5Icon name="book" size={20} color="#fff" />
                }
            }
        }
    },
    Thoughts: {
        screen: Thoughts,
        navigationOptions: ({ navigation }) => {
            return {
                tabBarLabel: "想法",
                tabBarIcon: ({ focused }) => {
                    return <MaterialComIcon name="thought-bubble" size={20} color="#fff" />
                }
            }
        }
    },
    PwManagement: {
        screen: PwManagement,
        navigationOptions: ({ navigation }) => {
            return {
                tabBarLabel: "密码管理",
                tabBarIcon: ({ focused }) => {
                    return focused ? (
                        <FontAwe5Icon name="unlock" size={20} color="#fff" />
                    ) : (
                        <FontAwe5Icon name="lock" size={20} color="#fff" />
                    )
                }
            }
        }
    }
}