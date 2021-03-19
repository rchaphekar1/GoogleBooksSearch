import React, { useState } from "react";
import SaveBtn from "../components/SaveBtn";
import LinkBtn from "../components/LinkBtn";
import Jumbotron from "../components/Jumbotron";
import InnerContainer from "../components/InnerContainer/InnerContainer";
import OuterContainer from "../components/OuterContainer/OuterContainer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [userSearch, setUserSearch] = useState("")

  // Loads all books and sets them to books
  function loadBooks() {
    API.viewBooks(userSearch)
      .then(res => {
        setBooks(res)
        }
      )
      .catch(err => console.log(err));
    console.log(books)
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { value } = event.target;
    setUserSearch(value.replace(/\s/g, '+'))
  };

  function handleSearchBtn(event) {
    event.preventDefault();
    if (userSearch) {
      loadBooks();
    }
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleSaveBtn(bookInfo) {
    API.saveBook({
      id: bookInfo.id,
      title: bookInfo.title,
      authors: bookInfo.authors,
      description: bookInfo.description,
      image: bookInfo.image,
      link: bookInfo.link
    })
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Google Books Search</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="Book"
                placeholder="Book Title (required)"
              />
              <FormBtn
                onClick={handleSearchBtn}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {books.length > 0 ? (
              <List>
                {books.map(book => (
                  <ListItem key={book.id}>
                    <OuterContainer>
                      <SaveBtn
                          handleSaveBtn={handleSaveBtn}
                          bookInfo={book}
                        >
                        Save
                      </SaveBtn>
                      <LinkBtn
                          link={book.link}
                      />
                      <InnerContainer
                        key={book.id}
                        title={book.title}
                        authors={book.authors}
                        image={book.image}
                        description={book.description}
                      />
                    </OuterContainer>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;
