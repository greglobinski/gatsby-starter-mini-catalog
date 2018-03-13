import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Link from "gatsby-link";

const styles = theme => ({
  sidebar: {
    transform: "translate3D(-220px,0,0)",
    width: "220px",
    height: "100vh",
    background: "#333",
    position: "absolute",
    top: 0,
    left: 0,
    color: "#ddd",
    padding: "1.5rem 0",
    transition: "transform .5s ease",
    ".sidebar &": {
      transform: "translate3D(0,0,0)"
    }
  },
  title: {
    margin: "0 1.5rem 1em"
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    padding: "0 .8rem",
    "& a": {
      color: "#ddd",
      fontWeight: 300,
      padding: ".7em .8rem"
    },
    "& a:hover": {
      color: "white",
      background: "#444"
    }
  }
});

const Sidebar = props => {
  const { classes, screenSequence } = props;

  return (
    <aside className={classes.sidebar}>
      <h3 className={classes.title}>Table of content</h3>
      <nav className={classes.nav}>
        {screenSequence &&
          screenSequence.map(el => (
            <Link key={el.slug} to={el.slug} onClick={props.onClick}>
              {el.title}
            </Link>
          ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  screenSequence: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default injectSheet(styles)(Sidebar);
