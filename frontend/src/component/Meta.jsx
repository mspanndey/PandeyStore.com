import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, discription, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="discription" content={"discription"} />
      <meta name="keyword" content={"keywords"} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to pandeystore",
  discription: "you can buy full home furniture from this website ",
  keywords: "sofa, beds , dining Buy Dining",
};

export default Meta;
