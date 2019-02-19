import React from "react";
import PropTypes from "prop-types";
import { Divider } from "react-native-elements"; 

const CustmoDivider = (props) => {
    const { bgColor, height } = props;

    return (
        <Divider style={{
            backgroundColor: bgColor,
            height: height
        }}/>
    )
}

CustmoDivider.propTypes = {
    bgColor: PropTypes.string,
    height: PropTypes.number
}

CustmoDivider.defaultProps = {
    bgColor: "#000",
    height: 1
}

export default CustmoDivider;