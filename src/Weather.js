import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Hello!</h1>
        <h3>{this.props.weatherData[0].date}</h3>
        {this.props.weatherData ? (
          <ul>
            {this.props.weatherData.map(item => (<li key={item}>Date: {item.date}, Description: {item.description}</li>))}
          </ul>
        ) : ''}
        {console.log(this.props.weatherData[0].date)}
      </>
    );
  }
}

export default Weather;
