import React from "react";
import PropTypes from "prop-types";

import Container from "../components/Container/";
import Item from "../components/Item/";

class ItemTemplate extends React.Component {
  render() {
    const { data, location } = this.props;

    return (
      <Container location={location}>
        <Item item={data.item} footnote={data.footnote} />
      </Container>
    );
  }
}

ItemTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default ItemTemplate;

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query ItemByPath($slug: String!) {
    item: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
    footnote: markdownRemark(id: { regex: "/footnote/" }) {
      html
    }
  }
`;
