import React from "react";
import PropTypes from "prop-types";

import Container from "../components/Container/";
import Page from "../components/Page/";

class PageTemplate extends React.Component {
  render() {
    const { data, location } = this.props;

    return (
      <Container location={location}>
        <Page page={data.page} footnote={data.footnote} />
      </Container>
    );
  }
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default PageTemplate;

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
    footnote: markdownRemark(id: { regex: "/footnote/" }) {
      id
      html
    }
  }
`;
