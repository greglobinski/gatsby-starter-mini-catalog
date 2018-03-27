import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Img from "gatsby-image";

const styles = theme => ({
  screens: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "30px 0",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "40px 0"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "50px 0"
    }
  },
  screen: {
    flexGrow: 0,
    flexBasis: "53.2%",
    "&:first-child": {
      flexBasis: "40%"
    },
    "&:last-child": {
      flexBasis: "100%",
      marginTop: "7%",
      "& $inner": {
        marginRight: 0
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      flexBasis: "23.9%",
      "&:first-child": {
        flexBasis: "18%"
      },
      "&:last-child": {
        flexBasis: "50.8%",
        marginTop: 0
      }
    }
  },
  inner: {
    borderRadius: "2px",
    border: "1px solid #ddd"
  }
});

const ItemScreens = props => {
  const { classes, screens } = props;

  return (
    <section className={classes.screens}>
      {screens.map((screen, i) => (
        <div key={i} className={classes.screen}>
          <div className={classes.inner}>
            <Img sizes={screen.sizes} />
          </div>
        </div>
      ))}
    </section>
  );
};

ItemScreens.propTypes = {
  classes: PropTypes.object.isRequired,
  screens: PropTypes.array.isRequired
};

export default injectSheet(styles)(ItemScreens);
