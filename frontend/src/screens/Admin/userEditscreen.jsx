import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../component/message";
import Loader from "../../component/Loader";
import FormContainer from "../../component/formContainer";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: updateLoading, refetch }] =
    useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ name, email, isAdmin, userId });
      toast.success("user Updated");

      navigate("/admin/userList");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Something went wrong ");
    }
  };

  return (
    <>
      <h1>Edit Your Product</h1>
      <Link to={"/admin/userList"} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {isLoading && <Loader></Loader>}

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

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)} // Use `e.target.checked` for checkboxes
              />
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

export default UserEditScreen;
