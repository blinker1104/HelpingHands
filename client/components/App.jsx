import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view:'start', info : {} };
  }

  componentDidMount() {
    console.log('All Ready');

  }


  render() {

    return (
      <div>
        {this.state.view}
      </div>
    );
  }
}

export default App;
