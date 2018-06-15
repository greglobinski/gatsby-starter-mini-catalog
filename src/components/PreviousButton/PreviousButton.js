import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Link from "gatsby-link";
import ArrowBackIcon from "material-ui-icons/ArrowBack";

const styles = theme => ({
  previousButton: {
    position: "absolute",
    left: "108px",
    top: "calc(100vh - 114px)",
    margin: "28px -28px 0 0",
    transition: ".5s ease",
    ".home &": {
      left: "50%"
    },
    ".sidebar &": {
      transform: "translate3D(220px,0,0)"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      left: "118px",
      top: "calc(100vh - 124px)"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      left: "128px",
      top: "calc(100vh - 134px)"
    },
    "@media all and (-ms-high-contrast:none)": {
      transition: 0
    }
  }
});

const PreviousButton = props => {
  const { classes, topOffset, to } = props;

  return (
    <div className={classes.previousButton} style={{ top: `${topOffset}` }} id="previousButton">
      <Button
        variant="fab"
        component={Link}
        to={to}
        color="primary"
        aria-label="previous"
        className={classes.button}
        title="Previous"
      >
        <ArrowBackIcon />
      </Button>
    </div>
  );
};

PreviousButton.propTypes = {
  classes: PropTypes.object.isRequired,
  topOffset: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default injectSheet(styles)(PreviousButton);
