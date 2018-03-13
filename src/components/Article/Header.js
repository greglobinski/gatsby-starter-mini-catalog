import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const styles = theme => ({
  header: {},
  title: {
    color: theme.main.colors.title,
    fontSize: `${theme.main.fonts.title.size}em`,
    letterSpacing: "-0.03em",
    margin: "0 0 .5em 0",
    "& strong": {
      fontWeight: 600,
      letterSpacing: "-.05em"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.main.fonts.title.sizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.main.fonts.title.sizeL}em`,
      letterSpacing: "-0.05em"
    }
  }
});

const Header = props => {
  function formatTitle(title) {
    const capitalIndex = title.search(/[A-Z]/);

    return (
      <span>
        {title.substring(0, capitalIndex)}
        <strong>{title.substring(capitalIndex)}</strong>
      </span>
    );
  }

  const { classes, title } = props;

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>{formatTitle(title)}</h1>
    </header>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default injectSheet(styles)(Header);
