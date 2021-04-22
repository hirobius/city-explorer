import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // Need images
    // Also need to convert to Cards: https://getbootstrap.com/docs/4.0/components/card/
    return (
      <>
        <ListGroup>
          <ListGroup.Item>
            Title: {this.props.movie.title}
          </ListGroup.Item>
          <ListGroup.Item>
            Overview: {this.props.movie.overview}
          </ListGroup.Item>
          <ListGroup.Item>
            Average Votes: {this.props.movie.average_votes}
          </ListGroup.Item>
          <ListGroup.Item>
            Popularity: {this.props.movie.popularity}
          </ListGroup.Item>
          <ListGroup.Item>
            Released on: {this.props.movie.released_on}
          </ListGroup.Item>
        </ListGroup>
      </>
    );
  }
}

export default Movie;
