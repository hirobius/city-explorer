import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
// import City from './City.js';
// import Search from './Search.js';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityData: {},
      haveWeSearchedYet: false,
      citySearchedFor: '',
    };
  }

  handleShowSearch = () => {
    this.setState({ haveWeSearchedYet: false });
  }

  handleSearch = async (citySearchedFor) => {
    console.log('searched', citySearchedFor);
    let locationResponseData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&q=${citySearchedFor}&format=json`);
    console.log(locationResponseData);
    this.setState({
      haveWeSearchedYet: true,
      citySearchedFor: citySearchedFor,
      locationData: locationResponseData.data[0]
    });
  }

  handleButtonClickWeather = async () => {
    let weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`);
    console.log(weatherData);
    this.setState({
      data: weatherData.data
    });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&q=${this.state.city}&format=json`);
      let cityNeeded = cityData.data[0];
      this.setState({
        cityData: cityNeeded
      });
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err.message}: ${err.response.data.error}` });
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
        {this.state.cityData.lat !== undefined ? <Jumbotron>
          <h3>{this.state.cityData.display_name}</h3>
          <h5>{this.state.cityData.lat}, {this.state.cityData.lon}</h5>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`} alt={`Map of ${this.state.cityData.display_name}`} />
        </Jumbotron> : ''}
        <Button variant="primary" onClick={this.handleButtonClickWeather}>What's the weather like??</Button>
        {this.state.data ? (
          <ul>
            {/* {this.state.data.data.map( item => (<li key={item}>{item}</li>))} */}
            <li>Here is where Data should render aka {this.state.data.data.map( item => (<li key={item}>{item}</li>))}</li>
          </ul>
        ) : ''}
        {/* {this.state.haveWeSearchedYet ?
          <City handleShowSearch={this.handleShowSearch} cityData={this.state.locationData} /> :
          <Search handleSearch={this.handleSearch} />} */}
      </>
    );
  }
}

export default App;
