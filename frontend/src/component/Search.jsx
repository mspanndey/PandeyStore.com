import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Search = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(urlKeyword);

  const formHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={formHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="search Product..."
        className="mr-sm-2 ml-sm-2"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-light"
        className="p-2 mx-2"
        style={{ backgroundColor: "#f0f0f0", color: "#333" }}
      >
        Search
      </Button>
    </Form>
  );
};

export default Search;
