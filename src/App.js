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
      // imagesToRender: [],
      // searchSuccess: false,
    };
  }

  // weather API work
  // hmm.....
  // build this in Weather.js
  // store the lat and lon upon form submit
  // hide key in a variable
  // register variable to the deployed heroku + netlify
  // build the weatherCallback

  // tune in to 7:09 of the recording for some hot tipson all of this in the FRONT END

  // Argentina as example: https://api.weatherbit.io/v2.0/current?lat=-34.9964963&lon=-64.9672817&callback=weatherCallback&key=c0cbcbc8e94548eb8fb2585b42b823f4

  // handleShowSearch = () => {
  //   this.setState({ haveWeSearchedYet: false });
  // }

  changeToRealData = async () => {
    try {
      let realWeather = await axios.get(`$https://api.weatherbit.io/v2.0/current?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}&key=${process.env.REACT_APP_WEATHER_API_KEY}/weather}`);
      console.log(realWeather);
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err.message}: ${err.message.data}` });
    }
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    this.getWeatherData();
    this.changeToRealData();
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESSKEY}&q=${this.state.city}&format=json`);
      let weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`);
      let cityNeeded = cityData.data[0];
      this.setState({
        cityData: cityNeeded,
        data: weatherData.data
      });

    } catch (err) {
      console.log(err);
      this.setState({ error: `${err.message}: ${err.message.data}` });
    }
  }

  getWeatherData = async () => {
    try {
      const weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`);
      console.log('this works', weatherData);
      this.setState({
        weatherData: weatherData.data
      })
      // console.log(this.state);
    } catch (error) {
      console.log(`error found!!! ${error.message}`);
    }
  }


  // getImages = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.imageSearch);
  //   axios.get('http://localhost:3001/images', // add the process.env.REACT BACKEND URL
  //     {
  //       params: {
  //         imageSearch: this.state.imageSearch,
  //       }
  //     })
  //     .then(images => {
  //       console.log(images);
  //       this.setState({
  //         imagesToRender: images.data,
  //         searchSucces: true,
  //       })
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // }


  render() {
    // let allCarouselItems = this.state.imagesToRender.map((img, index) => <img src={img.url} alt={img.alt} />);

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
            <Weather weatherData={this.state.data} />
            {console.log(this.state.data)}
          </>
          : ''}
        {/* <h1>Images Lab</h1>
        <form onSubmit={this.getImages}>
          <label>What would you like to see?
          <input onChange={e => this.setState({ imageSearch: e.target.value })} />
          </label>
          <input type="submit" />
        </form> */}
      </>
    );
  }
}

export default App;
