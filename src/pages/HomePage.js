

import React, { useState, useEffect } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/Searchform";
import api from "../apiservice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const totalPage = 10;
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleClickBook = (bookId) => {
    history.push(`/books/${bookId}`);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `/books?_page=${pageNum}&_limit=${limit}`;
        if (query) url += `&q=${query}`;
        const res = await api.get(url);
        console.log(res);
        setBooks(res.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [pageNum, limit, query]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">Book Store</h1>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <SearchForm
            loading={loading}
            searchInput={searchInput}
            handleSearchChange={handleSearchInputChange}
            handleSubmit={handleSubmit}
          />
          <hr />
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPage}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : (
            <ul className="list-unstyled d-flex flex-wrap justify-content-between">
              {books.map((book) => (
                <li key={book.id} onClick={() => handleClickBook(book.id)}>
                  <Card
                    style={{
                      width: "12rem",
                      height: "27rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={`${BACKEND_API}/${book.imageLink}`}
                    />
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>@{book.author}</Card.Text>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
