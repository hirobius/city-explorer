import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        {this.props.weatherData.map((day, index) => (
          <WeatherDay key={index} day={day} />))}
      </>
    );
  }
}

export default Weather;
