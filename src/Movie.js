import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let movieList = this.props.movieData.map((movie, index) =>
      <ListGroup.Item key={index}>Description: {movie.title}, Date: {movie.overview}</ListGroup.Item>);
    return (
      <>
        <ListGroup>
          {movieList}
        </ListGroup>
      </>
    );
  }
}

export default Movie;
