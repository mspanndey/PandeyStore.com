import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../component/message";
import Loader from "../../component/Loader";
import {
  useGetUserQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
const UsersListScreen = () => {
  const { data: users, isLoading, error } = useGetUserQuery();

  const [
    deleteUser,
    { isLoading: LoadingDelete, error: deleteError, refetch },
  ] = useDeleteUserMutation();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user ")) {
      try {
        deleteUser(id);
        toast.success("user Deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message></Message>
      ) : (
        <Table stripped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>
                <a href={`mailto:${users.email}`}>{users.email}</a>
              </th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit></FaEdit>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "red" }}></FaTrash>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersListScreen;
