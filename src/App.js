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
      weatherData: [],
    };
  }

  // location IQ Key here
  handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(this.state.city);
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&q=${this.state.city}&format=json`);
      let cityTarget = cityData.data[0];
      this.setState({
        city: cityTarget.display_name,
        lat: cityTarget.lat,
        lon: cityTarget.lon,
      });
      this.getWeatherData(cityTarget.lat, cityTarget.lon);
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err.message}: ${err.message.data}` });
    }
  }

  // backend referenced
  getWeatherData = async (lat, lon) => {
    try {
      let weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`, {
        params: {
          lat: lat,
          lon: lon
        }
      });
      console.log('this works', weatherData);
    } catch (err) {
      console.log(`error found!!! ${err.message}`);
      this.setState({ error: `${err.message}: ${err.message.data}` });
    }
  }

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
              <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`} alt={`Map of ${this.state.city}`} />
            </Jumbotron>
            <Weather weatherData={this.state.data} />
            {/* {console.log(this.state.data)} */}
          </>
          : ''}
      </>
    );
  }
}

export default App;
