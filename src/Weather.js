import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // console.log(this.props.weatherData);
    let weatherList = this.props.weatherData.map((day, index) =>
      <ListGroup.Item key={index}>Description: {day.description}, Date: {day.date}</ListGroup.Item>);
    return (
      <>
        <ListGroup>
          {weatherList}
        </ListGroup>
      </>
    );
  }
}

export default Weather;
