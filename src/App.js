import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {current_temperature: 0.0, isTemperatureLoaded: false};
  }
  pullDataFromApi() {
    this.setState({current_temperature: 0.0, isTemperatureLoaded: false});
    fetch(
      `http://127.0.0.1:5000/current`, { method: "get", headers: new Headers({ "Access-Control-Allow-Origin": "*" }) })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          current_temperature: json['temperature'],
          isTemperatureLoaded: true
        });
      });
      console.log("Temperature loaded")
    }
    
  componentDidMount() {
    var l = (() => this.pullDataFromApi());
    this.timerID = setInterval(() => this.pullDataFromApi(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    if(this.state.isTemperatureLoaded) {
      return(<h1 align="center">Current Temperature: {this.state.current_temperature}°C</h1>)
    }
    else {
      return(<h1 align="center">Current Temperature: Loading..</h1>)
    }
  }
}

export default App;
