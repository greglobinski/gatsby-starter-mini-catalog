import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Link from "gatsby-link";
import ArrowForwardIcon from "material-ui-icons/ArrowForward";

const styles = theme => ({
  nextButton: {
    position: "absolute",
    right: "58px",
    top: "calc(100vh - 114px)",
    margin: "28px -28px 0 0",
    transition: ".5s ease",
    ".home &": {
      right: "50%"
    },
    ".sidebar &": {
      transform: "translate3D(220px,0,0)"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      right: "68px",
      top: "calc(100vh - 124px)"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      right: "78px",
      top: "calc(100vh - 134px)"
    },
    "@media all and (-ms-high-contrast:none)": {
      transition: 0
    }
  }
});

const NextButton = props => {
  const { classes, topOffset, to } = props;

  return (
    <div className={classes.nextButton} style={{ top: `${topOffset}` }} id="nextButton">
      <Button
        variant="fab"
        component={Link}
        to={to}
        color="primary"
        aria-label="next"
        className={classes.button}
        title="Next"
      >
        <ArrowForwardIcon />
      </Button>
    </div>
  );
};

NextButton.propTypes = {
  classes: PropTypes.object.isRequired,
  topOffset: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default injectSheet(styles)(NextButton);
