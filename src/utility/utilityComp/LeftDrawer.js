import React, { Component } from "react";
import Drawer from "react-native-drawer";
import PropTypes from "prop-types";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";

const drawerStyles = {
	drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 }
};

class LeftDrawer extends Component {
    static propTypes = {
        contentComp: PropTypes.node.isRequired
    };

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.drawer = null;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.drawer.open();
    }

    close() {
        this.drawer.close();
    }

    componentDidMount() {
        this.listenOpen = RCTDeviceEventEmitter.addListener("LEFT_DRAWER_SHOW", () => {
            this.open();
        });

        this.listenClose = RCTDeviceEventEmitter.addListener("LEFT_DRAWER_CLOSE", () => {
            this.close();
        });
    }

    componentWillUnmount() {
        this.listenOpen.remove();
        this.listenClose.remove();
    }

    render() {
        const { contentComp, children } = this.props;

        return (
            <Drawer
                ref={ref => (this.drawer = ref)}
                side="left"
                type="overlay"
                tapToClose={true}
                content={
                    contentComp
                }
                openDrawerOffset={0.4}
                panOpenMask={0.4}
                panDrawerOffset={0.4}
                panCloseMask={0.4}
                closedDrawerOffset={0}
                styles={drawerStyles}
                tweenHandler={ratio => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}
                tweenDuration={250}
            >
                {children}
            </Drawer>
        );
    }
};

export default LeftDrawer;
