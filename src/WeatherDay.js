import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class WeatherDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <ListGroup>
          <ListGroup.Item>Description: {this.props.day.description}</ListGroup.Item>
          <ListGroup.Item>Date: {this.props.day.date}</ListGroup.Item>
        </ListGroup>
      </>
    );
  }
}

export default WeatherDay;
