import React from "react";
import PropTypes from "prop-types";

import Article from "../Article/";
import Content from "../Article/Content";
import Footer from "../Article/Footer";
import Header from "../Article/Header";

const Item = props => {
  const { item, footnote } = props;
  const itemTitle = ((item || {}).frontmatter || {}).title;
  const itemHtml = (item || {}).html;
  const footnoteHtml = (footnote || {}).html;

  return (
    <Article>
      <Header title={itemTitle} />
      <Content html={itemHtml} />
      <Footer html={footnoteHtml} />
    </Article>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  footnote: PropTypes.object.isRequired
};

export default Item;
