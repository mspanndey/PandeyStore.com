import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../component/message";
import Loader from "../../component/Loader";
import FormContainer from "../../component/formContainer";
import { toast } from "react-toastify";
import { useUpdateProductMutation } from "../../slices/productApiSlice";
import {
  useGetProductDetailsQuery,
  useUploadImageMutation,
} from "../../slices/productApiSlice";

const ProductEditScreen = () => {
  const { id: ProductId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");

  const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(ProductId);

  const [updateProduct, { isLoading: updateLoading, error: updateError }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setImage(product.image);
      setCategory(product.category);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ProductId,
      name,
      price,
      image,
      brand,
      countInStock,
      description,
      category,
    };

    const result = await updateProduct(updatedProduct);

    console.log(result);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated");
      navigate("/admin/ProductList");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <h1>Edit Your Product</h1>
      <Link to={"/admin/ProductList"} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {updateLoading && <Loader></Loader>}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>Error</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="my-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand" className="my-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter Image"
                value={image}
                onChange={(e) => setImage}
              ></Form.Control>
              <Form.Control
                type="file"
                lebel="choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-3">
              <Form.Label>Discription</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter Discription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter discription"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
