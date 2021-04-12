import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
      {this.state.data ? (
          <ul>
            <li>{this.state.data.data.map(item => (<li key={item}>Snow_depth: {item.snow_depth}, Clouds: {item.clouds}</li>))}</li>
          </ul>
        ) : ''}
      </>
    );
  }
}

export default Weather;
