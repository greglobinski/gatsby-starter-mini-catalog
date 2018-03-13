import React from "react";
import PropTypes from "prop-types";

import Article from "../Article/";
import Content from "../Article/Content";
import Footer from "../Article/Footer";
import Header from "../Article/Header";

const Page = props => {
  const { page, footnote } = props;
  const pageTitle = ((page || {}).frontmatter || {}).title;
  const pageHtml = (page || {}).html;
  const footnoteHtml = (footnote || {}).html;

  return (
    <Article>
      <Header title={pageTitle} />
      <Content html={pageHtml} />
      <Footer html={footnoteHtml} />
    </Article>
  );
};

Page.propTypes = {
  page: PropTypes.object.isRequired,
  footnote: PropTypes.object.isRequired
};

export default Page;
