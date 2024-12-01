import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../component/product.js";
import Loader from "../component/Loader.js";
import Message from "../component/message.js";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Paginate from "../component/paginate.jsx";
import ProductCarousel from "../component/ProductCarousel.jsx";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  console.log(data);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" classname="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message varient="danger">
          {error?.data?.message || error.error}
          {console.log(error, "its here ")}
        </Message>
      ) : (
        <>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product pro={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
