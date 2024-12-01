import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../component/message";
import Loader from "../../component/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../component/paginate";

const ProductScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  const [deleteProduct, { isLoading: LoadingDelete, refetch: Load }] =
    useDeleteProductMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are You Sure,You Want To Delete")) {
      try {
        await deleteProduct(id);
        toast.success("Product Deleted");
        Load();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [
    createProduct,
    { isLoading: LoadingProduct, error: productError, refetch },
  ] = useCreateProductMutation();

  const creatingYourProduct = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        toast.success("Product created successfully!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={creatingYourProduct}>
            <FaEdit></FaEdit> CreateProduct
          </Button>
        </Col>
      </Row>
      {LoadingDelete && <Loader />}

      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">Error</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  {/* Add a unique key for each item */}
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {/* Edit Button */}
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    {/* Delete Button */}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)} // Pass the correct product ID
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <Paginate
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              className="my-2"
            />
          </Table>
        </>
      )}
    </>
  );
};

export default ProductScreen;
