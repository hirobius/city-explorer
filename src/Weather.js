import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let allListGroups = this.props.weatherData.map((day, index) => <ListGroup.Item key={index}>00 +{index}</ListGroup.Item>);

    return (
      <>
        <ListGroup>
          {allListGroups}
        </ListGroup>
        <h1>Hello!</h1>
        <h3>{this.props.weatherData[0].date}</h3>
        <ul>
          {this.props.weatherData.map(item => (<><li key={item}>Description: {item.description},</li><li>Date: {item.date}</li></>))}
        </ul>
        {console.log(this.props.weatherData[0].date)}
      </>
    );
  }
}

export default Weather;
