import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apiservice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const [ books , setbook ] = useState([]);
  const [loading, setload] = useState(false);
  const [removebookid , setremovebookid] = useState("");
  const history = useHistory();



const handleclickbook = (bookid)  => {
  history.push(`/books/${bookid}`);
};

const removebook= (bookid) => {
  setremovebookid(bookid);
};

useEffect(() => {
  if (removebookid) return;
  const fetchData = async () => {
    setload(true);
    try {
      const res = await api.get(`/favorites`);
      setbook(res.data);
    } catch (error) {
      toast(error.message);
    }
    setload(false);
  };
  fetchData();
}, [removebookid]);

useEffect(() => {
  if (!removebookid) return;
  const fetchData = async () => {
    setload(true);
    try {
      await api.delete(`/favorites/${removebookid}`);
      toast.success("The book has been removed");
      setremovebookid("");
    } catch (error) {
      toast(error.message);
    }
    setload(false);
  };
  fetchData();
}, [removebookid]);

return (
  <Container>
    <Row className= "justify-content-center">
      <Col md={6}>
        <h1 className ="text-center">
          Reading
        </h1>
        <hr/>
      </Col>
    </Row>

    <Row>
      <Col>
      {loading ? (
          <div className="text-center">
          <ClipLoader color="black" size={200} loading={true} />
          </div>
      ) : (
        <ul className="list-unstyled d-flex flex-wrap justify-content-between">
          {books.map( ( book ) => (
            <li key= {book.id}>
              <Card
              style = {{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
                position: "relative",
              }}>
                <Card.Img 
                variant = "top"
                src = {`${BACKEND_API}/${book.imageLink}`}
                onClick={() => handleclickbook(book.id)}/>
                <Card.Body>
                  <Card.Title> {book.title} </Card.Title>
                  <Card.Text> @{book.author} </Card.Text>
                  <Button
                        className="position-absolute btn-danger"
                        style={{ top: "5px", right: "5px" }}
                        size="sm"
                        onClick = {() => removebook(book.id)}>
                          
                           &times;

                </Button>
                </Card.Body>
              </Card>
            </li>
          ) )}
        </ul>

      )}</Col>
    </Row>
  </Container>
);
};

export default ReadingPage;