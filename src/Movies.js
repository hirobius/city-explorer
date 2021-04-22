import React from 'react';
import Movie from './Movie';

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        {this.props.movieData.map((movie, index) => (
          <Movie key={index} movie={movie} />))}
      </>
    );
  }
}

export default Movies;
