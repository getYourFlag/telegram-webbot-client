import React from "react";
import ReactDOM from "react-dom";
import axios from './helpers/axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'display': 'Hello Word'
    }
  }

  async componentDidMount() {
    axios.get('/')
      .then(response => this.setState({
        'display': response.data
      }));
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
