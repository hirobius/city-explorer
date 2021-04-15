import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let allListGroups = this.props.weatherData.map((day, index) =>
        <ListGroup.Item key={index}>Description: {day.description}, Date: {day.date}</ListGroup.Item>);
      
    return (
      <>
        <h1>Weather for:</h1>
        <h3>{this.props.weatherData[0].date}</h3>
        <ListGroup>
          {allListGroups}
        </ListGroup>
        {/* {console.log(this.props.weatherData[0].date)} */}
      </>
    );
  }
}

export default Weather;
