import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swipeable from "react-swipeable";
import { navigateTo } from "gatsby-link";
import { Scrollbars } from "react-custom-scrollbars";
require("core-js/fn/array/find-index");

import { setLastScreen, setSidebarVisible } from "../../state/store";

const NEXT = 1;
const PREV = -1;

const NEXT_TRANSITION = "asNext";
const PREV_TRANSITION = "asPrev";

const styles = theme => ({
  container: {
    height: "100vh",
    width: "100%",
    background: theme.base.colors.background,
    overflow: "hidden",
    color: theme.base.colors.text,
    transform: "translate3D(0,0,0)",
    transition: ".5s ease",
    ".sidebar &": {
      transform: "translate3D(220px,0,0)"
    }
  },
  aside: {
    background: theme.base.colors.background,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    overflow: "hidden"
  },
  main: {
    zIndex: 1,
    position: "relative",
    background: theme.base.colors.background,
    transform: "translate3D(0,0,0)",
    width: "100%",
    height: "100vh",
    animationDuration: ".8s",
    overflow: "auto"
  },
  overlay: {
    position: "absolute",
    background: "rgba(255,255,255,.6)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "none",
    transition: ".5s",
    ".sidebar &": {
      display: "block"
    }
  },
  [NEXT_TRANSITION]: {
    animationName: "mainEntryAsNext"
  },
  [PREV_TRANSITION]: {
    animationName: "mainEntryAsPrev"
  },
  "@keyframes mainEntryAsNext": {
    "0%": {
      background: "#ddd",
      transform: "translate3D(100%,0,0)"
    },
    "100%": {
      transform: "translate3D(0,0,0)"
    }
  },
  "@keyframes mainEntryAsPrev": {
    "0%": {
      background: "#ddd",
      transform: "translate3D(-100%,0,0)"
    },
    "100%": {
      transform: "translate3D(0,0,0)"
    }
  },
  swipe: {
    width: "100%",
    height: "100%"
  }
});

class Container extends React.Component {
  lastScreen = null;
  screenTransition = "";

  componentDidMount() {
    if (this.props.lastScreen) {
      this.lastScreen = this.props.lastScreen;

      const lastScreenIndex = this.props.screenSequence.findIndex(
        el => el.slug === this.props.lastScreenPath
      );

      const screenIndex = this.getScreenIndex();

      this.screenTransition = lastScreenIndex <= screenIndex ? NEXT_TRANSITION : PREV_TRANSITION;
    }

    if (this.props.location.pathname !== this.props.lastScreenPath) {
      this.props.setLastScreen({ obj: this.props.children, path: this.props.location.pathname });
    }
  }

  getScreenIndex() {
    return this.props.screenSequence.findIndex(el => el.slug === this.props.location.pathname);
  }

  getToScreen(direction) {
    const maxIndex = this.props.screenSequence.length - 1;
    let newIndex = this.getScreenIndex() + direction;

    if (newIndex > maxIndex) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = maxIndex;
    }

    return this.props.screenSequence[newIndex].slug;
  }

  onSwipedLeft = e => {
    const toScreen = this.getToScreen(NEXT);
    navigateTo(toScreen);
  };

  onSwipedRight = e => {
    const toScreen = this.getToScreen(PREV);
    navigateTo(toScreen);
  };

  overlayOnClick = e => {
    if (this.props.sidebarVisible) {
      this.props.setSidebarVisible(false);
    }
  };

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.container}>
        <main className={`${classes.main} ${classes[this.screenTransition]}`}>
          <Swipeable
            onSwipingLeft={this.onSwipedLeft}
            onSwipingRight={this.onSwipedRight}
            className={classes.swipe}
          >
            <Scrollbars autoHide universal={true} className={classes.scrollbars}>
              {children}
            </Scrollbars>
          </Swipeable>
          <div className={classes.overlay} onClick={this.overlayOnClick} />
        </main>
        <aside className={classes.aside}>{this.lastScreen}</aside>
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  screenSequence: PropTypes.array.isRequired,
  lastScreen: PropTypes.node,
  lastScreenPath: PropTypes.string.isRequired,
  setLastScreen: PropTypes.func.isRequired,
  sidebarVisible: PropTypes.bool.isRequired,
  setSidebarVisible: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    screenSequence: state.screenSequence,
    lastScreen: state.lastScreen,
    lastScreenPath: state.lastScreenPath,
    sidebarVisible: state.sidebarVisible
  };
};

const mapDispatchToProps = {
  setLastScreen,
  setSidebarVisible
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(Container));
