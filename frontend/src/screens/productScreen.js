import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/message.js";
import { addToCart } from "../slices/cartSlice.js";
import Meta from "../component/Meta.jsx";
import {
  Row,
  Form,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../component/rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productApiSlice";
import Loader from "../component/Loader";

const ProductScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: reviewLoading }] =
    useCreateReviewMutation();

  const userInfo = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      toast.success("review added");
      refetch();
      setRating(0);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {/* Fixed "variant" typo */}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        product && (
          <>
            <Meta title={product.name} />
            <Row>
              <Col md="5">
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md="4">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} Reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroupItem>Price: ${product.price}</ListGroupItem>
                  <ListGroupItem>
                    Description: {product.description}
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md="3">
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          $
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control // Fixed capitalization
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {Array.from(
                              { length: product.countInStock },
                              (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1} {/* Fixed empty option */}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={() => addToCartHandler()}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <Row className="reviews">
              <Col md={6}>
                <h1>Reviews</h1>

                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.Comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h2>write a customer review</h2>
                    {reviewLoading && <Loader />}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="my-3">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - poor</option>
                            <option value="2">2 - fair</option>
                            <option value="3">3 - good</option>
                            <option value="4">4 - verygood</option>
                            <option value="5">5 - excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            value={comment}
                            placeholder="Add a comment here "
                            row="3"
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type="submit"
                          disabled={reviewLoading}
                          variant="primary"
                          className="my-3"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign In</Link> write a review{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
