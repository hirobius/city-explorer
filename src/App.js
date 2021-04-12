import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Weather from './Weather';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityData: {},
      citySearchedFor: '',
    };
  }

  handleShowSearch = () => {
    this.setState({ haveWeSearchedYet: false });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.
        REACT_APP_LOCATIONIQ_ACCESSKEY}&q=${this.state.city}&format=json`);
      let weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`);
      let cityNeeded = cityData.data[0];
      this.setState({
        cityData: cityNeeded,
        data: weatherData.data
      });
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err.message}: ${err.response.data.error}` });
    }
  }

  // weatherTestData = (beasts) => {
  //   this.setState({ allBeasts: beasts });
  // }

  // handleButtonClickWeather = async () => {
  //   let weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`);
  //   console.log(weatherData);
  //   this.setState({
  //     data: weatherData.data
  //   });
  // }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="City">
            <Form.Label>City name</Form.Label>
            <Form.Control value={this.state.city} onInput={e => this.setState({ city: e.target.value })}></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        {this.state.error ? <h3>{this.state.error}</h3> : ''}
        {this.state.cityData.lat !== undefined ?
          <>
            <Jumbotron>
              <h3>{this.state.cityData.display_name}</h3>
              <h6>{this.state.cityData.lat}, {this.state.cityData.lon}</h6>
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`} alt={`Map of ${this.state.cityData.display_name}`} />
            </Jumbotron>
            {/* beginnings of passing props in the function weatherTestData above */}
            <Weather weatherTestData={this.weatherTestData} />
          </>
          : ''}

          {/* move the below to the Weather component */}
        {this.state.data ? (
          <ul>
            <li>{this.state.data.data.map(item => (<li key={item}>Snow_depth: {item.snow_depth}, Clouds: {item.clouds}</li>))}</li>
          </ul>
        ) : ''}
      </>
    );
  }
}

export default App;
