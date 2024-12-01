import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./rating";

const Product = ({ pro }) => {
  return (
    <>
      <Card className="my-3 pd-3 rounded">
        <Link to={`/product/${pro._id}`}>
          {console.log(pro.image)}
          <Card.Img src={pro.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${pro._id}`}>
            <Card.Title as="div" className="product-title">
              <strong>{pro.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="h3">${pro.price}</Card.Text>
          <Card.Text as="div">
            <Rating
              value={pro.rating}
              text={`${pro.numReviews} Reviews`}
            ></Rating>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
