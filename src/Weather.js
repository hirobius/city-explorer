import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // let weatherList = this.props.weatherData.map((day, index) =>
    //   <ListGroup.Item key={index}>Description: {day.description}, Date: {day.date}</ListGroup.Item>);
    return (
      <>
        {/* <ListGroup> */}
          {/* {weatherList} */}
          <WeatherDay weatherData={this.props.weatherData} />
        {/* </ListGroup> */}
      </>
    );
  }
}

export default Weather;
