import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Container from "../components/Container/";
import Home from "../components/Home/";

class Index extends React.Component {
  render() {
    const { location, screenSequence } = this.props;

    return (
      <Container location={location}>
        <Home screenSequence={screenSequence} />
      </Container>
    );
  }
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  screenSequence: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    screenSequence: state.screenSequence
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
