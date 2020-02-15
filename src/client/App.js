import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'display': ''
    }
  }

  componentDidMount() {
    axios.get('https://localhost:8080')
      .then(res => res.json())
      .then(displayStr => this.setState({
        'display': displayStr
      }))
  }

  render() {
    return (
      <div>
        <h1> {this.state.display} </h1>
      </div>
    );
  }
}

export default App;
