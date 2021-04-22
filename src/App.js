import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Weather from './Weather';
import Movies from './Movies';
import Container from 'react-bootstrap/Container';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityData: {},
      weatherData: [],
      movieData: [],
      searchedYet: false
    };
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&q=${this.state.city}&format=json`);
      let cityTarget = cityData.data[0];
      this.setState({
        cityName: cityTarget.display_name,
        lat: cityTarget.lat,
        lon: cityTarget.lon,
        searchedYet: true
      });
      this.getWeatherData();
      this.getMovieData();
      console.log(this.state);
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err.message}: ${err.message.data}` });
    }
  }

  getWeatherData = async () => {
    try {
      let weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`, {
        params: {
          lat: this.state.lat,
          lon: this.state.lon
        }
      });
      // console.log('this works', weatherData);
      this.setState({
        weatherData: weatherData.data
      })
    } catch (err) {
      console.log(`error found!!! ${err.message}`);
      this.setState({ error: `${err.message}: ${err.message.data}` });
    }
  }

  getMovieData = async () => {
    try {
      let movieData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`, {
        params: {
          cityName: this.state.city,
        }
      });
      console.log(this.state.city);
      this.setState({
        movieData: movieData.data
      })
    } catch (err) {
      console.log(`error found!!! ${err.message}`);
      this.setState({ error: `${err.message}: ${err.message.data}` });
    }
  }

  render() {
    console.log(this.state.movieData);
    return (
      <>
        {/* fill the next ternary to clean up empty box problems */}
        {this.state.searchedYet ? '' : ''}
        <Container>
          {this.state.error ? // build Error component and insert here
            <h3>{this.state.error}</h3> : ''}
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
          {this.state.cityData.lat === undefined ?
            <>
              <Jumbotron>
                <h3>{this.state.cityName}</h3>
                <h6>{this.state.lat} {this.state.lon}</h6>
                <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&center=${this.state.lat},${this.state.lon}&zoom=10`} alt={`Map of ${this.state.cityName}`} />
              </Jumbotron>
              <Weather weatherData={this.state.weatherData} />
              <Movies movieData={this.state.movieData} />
            </>
            : console.log(`dang`)}
        </Container>
      </>
    );
  }
}

export default App;
