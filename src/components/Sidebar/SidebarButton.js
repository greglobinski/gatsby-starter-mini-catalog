import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import MenuIcon from "material-ui-icons/Menu";
import CloseIcon from "material-ui-icons/Close";

const styles = theme => ({
  sidebarButton: {
    position: "absolute",
    left: "58px",
    top: "calc(100vh - 114px)",
    margin: "28px 0 0 -28px",
    transition: "transform .5s ease",
    ".home &": {
      display: "none"
    },
    ".sidebar &": {
      transform: "translate3D(162px,0,0)"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      left: "68px",
      top: "calc(100vh - 124px)",
      ".sidebar &": {
        transform: "translate3D(152px,0,0)"
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      left: "78px",
      top: "calc(100vh - 134px)",
      ".sidebar &": {
        transform: "translate3D(142px,0,0)"
      }
    }
  }
});

const SidebarButton = props => {
  const { classes, sidebarVisible } = props;

  return (
    <div className={classes.sidebarButton}>
      <Button
        variant="fab"
        aria-label="next"
        className={classes.button}
        title="Next"
        onClick={props.onClick}
      >
        {sidebarVisible ? <CloseIcon /> : <MenuIcon />}
      </Button>
    </div>
  );
};

SidebarButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  sidebarVisible: PropTypes.bool.isRequired
};

export default injectSheet(styles)(SidebarButton);
