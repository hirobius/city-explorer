import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // let allListGroups = this.props.weatherData.map((day, index) =>
    //   <ListGroup.Item key={index}>Description: {day.description}, Date: {day.date}</ListGroup.Item>);

    // async function allListGroups(day, index) {
    //   try {
    //     this.props.weatherData.map((day, index) =>
    //       <ListGroup.Item key={index}>Description: {day.description}, Date: {day.date}</ListGroup.Item>);
    //   } catch (err) {
    //     console.log(`error found!!! ${err.message}`);
    //     this.setState({ error: `${err.message}: ${err.message.data}` });
    //   }
    // }
    // ;

    return (
      <>
        <ListGroup>
          <ListGroup.Item key={'1'}>Description: {this.props.weatherData.status}, Date: {this.props.weatherData.datetime}</ListGroup.Item>);
          {/* {allListGroups} */}
        </ListGroup>
      </>
    );
  }
}

export default Weather;
