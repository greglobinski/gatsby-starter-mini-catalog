import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import ViewCompactIcon from "material-ui-icons/ViewCompact";

const styles = theme => ({
  home: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    justifyContent: "center",
    width: "100%",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: "1.3em"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: "1.6em"
    },
    "@media all and (-ms-high-contrast:none)": {
      height: "100%"
    }
  },
  title: {
    color: theme.home.colors.title,
    fontSize: "2.8em",
    letterSpacing: "-.03em",
    margin: 0,
    "& strong": {
      fontWeight: 600,
      letterSpacing: "-.05em"
    }
  },
  subTitle: {
    fontSize: "1em",
    fontWeight: 300,
    letterSpacing: ".05em",
    margin: ".2em 0 0 0"
  },
  mark: {
    color: theme.home.colors.title,
    height: "100px",
    margin: "0 0 20px",
    width: "100px",
    "& svg": {
      height: "100%",
      width: "100%"
    }
  },
  nextButtonDock: {
    margin: "20px 0 30px",
    width: "56px",
    height: "56px"
  },
  "@keyframes buttonEntry": {
    "0%": {
      transform: "scale(0)"
    },
    "90%": {
      transform: "scale(1.2)"
    },
    "100%": {
      transform: "scale(1)"
    }
  }
});

const Home = props => {
  const { classes } = props;

  return (
    <div className={classes.home}>
      <div className={classes.mark}>
        <ViewCompactIcon />
      </div>
      <h1 className={classes.title}>
        mini<strong>Catalog</strong>
      </h1>
      <h2 className={classes.subTitle}>a demo site of a GatsbyJS starter</h2>
      <div className={classes.nextButtonDock} id="nextButtonDock" />
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  screenSequence: PropTypes.array.isRequired
};

export default injectSheet(styles)(Home);
