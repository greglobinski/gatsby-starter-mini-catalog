import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const styles = theme => ({
  footer: {
    margin: "20px 0 50px 0",
    fontSize: `${theme.footer.fonts.footnote.size}em`,
    lineHeight: theme.footer.fonts.footnote.lineHeight,
    color: theme.footer.colors.text,
    "& a": {
      color: theme.footer.colors.link,
      fontWeight: "normal",
      textShadow: "none"
    },
    "& a:hover": {
      color: theme.footer.colors.linkHover
    },
    "& ul": {
      listStyle: "none",
      margin: 0,
      padding: 0,
      textAlign: "center"
    },
    "& li": {
      display: "inline-block",
      margin: "0 .3em"
    }
  }
});

const Footer = props => {
  const { classes, html } = props;

  return <footer className={classes.footer} dangerouslySetInnerHTML={{ __html: html }} />;
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  html: PropTypes.string.isRequired
};

export default injectSheet(styles)(Footer);
