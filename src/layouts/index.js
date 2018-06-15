import React from "react";
import injectSheet from "react-jss";
import { MuiThemeProvider } from "material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigateTo } from "gatsby-link";
require("core-js/fn/array/find-index");
require("typeface-open-sans");
var FontFaceObserver = require("fontfaceobserver");

import theme from "../styles/theme";
import globals from "../styles/globals";

import { setScreenSequence, setSidebarVisible } from "../state/store";
import { timeoutThrottlerHandler } from "../utils/helpers";

import Sidebar from "../components/Sidebar";
import NextButton from "../components/NextButton/";
import PreviousButton from "../components/PreviousButton/";
import SidebarButton from "../components/Sidebar/SidebarButton";

class Layout extends React.Component {
  constructor() {
    super();

    if (typeof window !== `undefined`) {
      this.loadFont("font600", "Open Sans", 600);
      this.loadFont("font300", "Open Sans", 300);
      this.loadFont("font400", "Open Sans", 400);
    }
  }

  state = {
    nextButtonTopOffset: "",
    toForNextButton: "",
    toForPreviousButton: ""
  };

  timeouts = {};

  componentDidMount() {
    const screenSequence = this.buildScreenSequence(this.props.data);
    this.props.setScreenSequence(screenSequence);

    if (typeof window !== `undefined`) {
      window.addEventListener("resize", this.resizeThrottler, false);
    }

    this.positionNextButton();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.screenSequence !== prevProps.screenSequence) {
      this.setToForNextButton();
      this.setToForPreviousButton();
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname === "/") {
        this.positionNextButton();
      } else {
        this.setState({ nextButtonTopOffset: "" });
      }
      this.setToForNextButton();
      this.setToForPreviousButton();
    }
  }

  loadFont = (name, family, weight) => {
    if (window.document.documentElement.className.indexOf(`${name}-fonts-loaded`) > -1) {
      return;
    }

    const font = new FontFaceObserver(family, {
      weight: weight
    });

    font.load().then(
      function() {
        console.log(`${name} is available`);
        window.document.documentElement.className += ` ${name}-loaded`;
      },
      function() {
        console.log(`${name} is not available`);
      }
    );
  };

  buildScreenSequence(data) {
    const pages = data.pages.edges.map(edge => ({
      slug: edge.node.fields.slug,
      title: edge.node.frontmatter.title
    }));
    const items = data.items.edges.map(edge => ({
      slug: edge.node.fields.slug,
      title: edge.node.frontmatter.title
    }));
    const home = { slug: "/", title: "Home" };

    const screenSequence = [home, ...items, ...pages];

    return screenSequence;
  }

  resizeThrottler = () => {
    return timeoutThrottlerHandler(this.timeouts, "resize", 500, this.resizeHandler);
  };

  resizeHandler = () => {
    this.positionNextButton();
  };

  positionNextButton = () => {
    if (location.pathname === "/") {
      const buttonDock = document.querySelector("#nextButtonDock");

      const buttonDockOffsetTop = buttonDock.offsetTop;
      this.setState({ nextButtonTopOffset: `${buttonDockOffsetTop}px` });
    }
  };

  setToForNextButton() {
    const currentScreen = this.props.location.pathname;
    const sequence = this.props.screenSequence;

    const currentScreenIndex = sequence.findIndex(el => el.slug === currentScreen);
    const toIndex = currentScreenIndex + 1;

    const to = toIndex > sequence.length - 1 ? "/" : sequence[toIndex].slug;

    this.setState({ toForNextButton: to });

    // because we dynamicaly changing a 'to' parameter of the NextButton's gatsby-link component
    // we have to manualy do the job which in usual circumstances gatsby-link does for us automaticaly,
    // prefetch assets for the next path

    // eslint-disable-next-line no-undef
    ___loader.enqueue(to);
  }

  setToForPreviousButton() {
    const currentScreen = this.props.location.pathname;
    const sequence = this.props.screenSequence;

    const currentScreenIndex = sequence.findIndex(el => el.slug === currentScreen);
    const toIndex = currentScreenIndex - 1;

    const to = toIndex < 0 ? "/" : sequence[toIndex].slug;

    this.setState({ toForPreviousButton: to });

    // because we dynamicaly changing a 'to' parameter of the PreviousButton's gatsby-link component
    // we have to manualy do the job which in usual circumstances gatsby-link does for us automaticaly,
    // prefetch assets for the next path

    // eslint-disable-next-line no-undef
    ___loader.enqueue(to);
  }

  sidebarLinkOnClick = e => {
    e.preventDefault();
    const to = e.target.getAttribute("href");

    this.props.setSidebarVisible(false);
    setTimeout(() => {
      navigateTo(to);
    }, 500);
  };

  sidebarButtonOnClick = e => {
    this.props.setSidebarVisible(this.props.sidebarVisible ? false : true);
  };

  renderPreviousButton() {
    // Just render Previous button if you're not in the Home Screen
    return location.pathname !== "/" ? (
      <PreviousButton
        topOffset={this.state.nextButtonTopOffset}
        to={this.state.toForPreviousButton}
      />
    ) : null;
  }

  render() {
    const { location, screenSequence, sidebarVisible } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div
          className={`layout ${location.pathname === "/" ? "home" : ""} ${
            sidebarVisible ? "sidebar" : ""
          }`}
        >
          {this.props.children()}
          <Sidebar screenSequence={screenSequence} onClick={this.sidebarLinkOnClick} />
          {this.renderPreviousButton()}
          <NextButton topOffset={this.state.nextButtonTopOffset} to={this.state.toForNextButton} />
          <SidebarButton onClick={this.sidebarButtonOnClick} sidebarVisible={sidebarVisible} />
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  screenSequence: PropTypes.array.isRequired,
  setScreenSequence: PropTypes.func.isRequired,
  sidebarVisible: PropTypes.bool.isRequired,
  setSidebarVisible: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    sidebarVisible: state.sidebarVisible,
    screenSequence: state.screenSequence
  };
};

const mapDispatchToProps = {
  setScreenSequence,
  setSidebarVisible
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(globals)(Layout));

// eslint-disable-next-line no-undef
export const guery = graphql`
  query LayoutQuery {
    pages: allMarkdownRemark(
      filter: { id: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
          }
        }
      }
    }
    items: allMarkdownRemark(
      filter: { id: { regex: "//items//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
