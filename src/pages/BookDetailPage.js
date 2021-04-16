// In BookDetailPage.js
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apiservice.js";

const BACKEND_API = process.env.REACT_APP_BACKEND_API
// ...
const BookDetailPage = () => {
const [loading, setloading] = useState(false);
const [book, setbook ] = useState(null);
const [adding, setadding] = useState(false);
const param= useParams();
const  bookid  = param.id;
   


  const addToReadingList = (book) => {
    setadding(book);
  };

  useEffect(() => {
    const postData = async () => {
      if (!adding) return;
      setloading(true);
      try {
        await api.post(`/favorites`, adding);
        toast.success("The book has been added to the reading list!");
      } catch (error) {
        toast.error(error.message);
      }
      setloading(false);
    };
    postData();
  }, [adding]);


  
useEffect(() => {
      const fetchData = async () => {
        setloading(true);
        try {
          const res = await api.get(`/books/${bookid}`);
          setbook(res.data);
        } catch (error) {
          toast.error(error.message);
        }
        setloading(false);
        };
        fetchData();

}, [bookid]);

return (
  <Container>
    {loading ? ( 
      <div className = "text-center">

        <ClipLoader color = "black" size = {200} loading= {true}/>

      </div>
    ) : (
      <Row className = "border border-info mt-5">
        <Col md= {3}>
          {book &&  (
            <img className= "w-100"
            src = {`${BACKEND_API}/${book.imageLink}`}
            alt = ""
            />
          )}
        </Col>
        <Col md= {9}>
          {book && (
          <>
            <h2>
              {book.title}
            </h2>
            
            <div>
              <strong>Author:</strong> {book.author}
            </div>

            <div>
              <strong>year:</strong> {book.year}
            </div>

            <div>
              <strong>Country:</strong> {book.country}
            </div>

            <div>
              <strong>Pages:</strong> {book.pages}
            </div>

            <div>
              <strong>language:</strong> {book.language} 
            </div>
            
            <Button onClick = {() => addToReadingList(book)}>
            add to reading list 
            </Button>
            </>
          )}
        </Col>
      </Row>
    )}
  </Container>
);
};

export default BookDetailPage;

