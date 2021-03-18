import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import LinkBtn from "../components/LinkBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

function Saved() {
  const [books, setBooks] = useState({})

  useEffect(() => {
    API.getBooks()
    .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  }, [])

  // Deletes a book from the database with a given id, then reloads books from the db
  function handleDeleteBtn(id) {
    API.deleteBook(id)
  }

  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Google Books Search
              </h1>
            </Jumbotron>
            <div>
              {books.length > 0 ? (
              <List> 
                {books.map(book => (
                  <ListItem key={book.id}>
                    <div>
                      <DeleteBtn
                          handleDeleteSubmit={handleDeleteBtn}
                          id={book.id}
                      />
                      <LinkBtn
                        link={book.link}
                      />
                      <div
                        key={book.id}
                        title={book.title}
                        authors={book.authors}
                        image={book.image}
                        description={book.description}
                      />
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <p>No Books Saved</p>
            )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }


export default Saved;
