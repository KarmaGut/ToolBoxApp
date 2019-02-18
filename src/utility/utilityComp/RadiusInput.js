import React, { Component } from "react";
// import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";
import { Input } from "react-native-elements";

const RadiusInput  = (props) => {
    const { placeholder, LeftIcon, onChangeFunc, containerWidth, keyboardType, customContainerStyle, secureTextEntry } = props;

    return (
        <Input 
            placeholder={placeholder}
            placeholderTextColor="rgb(87, 95, 132)"
            selectionColor="rgb(87, 95, 132)"
            leftIcon={LeftIcon}
            containerStyle={{
                width: containerWidth,
                height: 56,
                borderRadius: 28,
                borderColor: "rgb(90, 99, 136)",
                borderWidth: 1,
                backgroundColor: "rgb(46, 50, 70)",
                ...customContainerStyle
            }}
            keyboardType={keyboardType}
            inputStyle={{ paddingBottom: 12, fontSize: 16, color: "rgb(87, 95, 132)" }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={onChangeFunc}
            secureTextEntry={secureTextEntry}
        />
    )
}

RadiusInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChangeFunc: PropTypes.func.isRequired,
    LeftIcon: PropTypes.element,
    isShake: PropTypes.bool,
    containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    keyboardType: PropTypes.string,
    customContainerStyle: PropTypes.object,
    secureTextEntry: PropTypes.bool
};

RadiusInput.defaultProps = {
    isShake: true,
    onChangeFunc: () => {},
    containerWidth: "100%",
    keyboardType: "default",
    customContainerStyle: {},
    secureTextEntry: false
}

export default RadiusInput;