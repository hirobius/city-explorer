import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class WeatherDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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

export default WeatherDay;
