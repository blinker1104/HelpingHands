import React from 'react';
import $ from 'jquery';
import axios from 'axios';








class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view:'start',
      loggedin:false,
      username:''
    };
  }

  componentDidMount() {
    console.log('All Ready');
    axios.get('/userStatus')
      .then((res)=> {
        const username = res.data.username;
        const loggedin = res.data.loggedin;

        this.setState({
          username, loggedin
        });
      })
      .catch();
  }



  loginButton () {
    return (<button onClick={()=>{location.href = '/login';}} className="float-left submit-button" >Login / Register</button>);
  }

  logoutButton () {
    return (<button onClick={()=> axios.post('/logoutProcess').then((res)=>this.setState({loggedin: false}))} className="float-left submit-button" >logout</button>);
  }


  render() {

    return (
      <div>
        { (!this.state.loggedin) ?
          this.state.view : `Welcome user "${this.state.username}"`}

        { (!this.state.loggedin) ?
         this.loginButton() : this.logoutButton() }

      </div>
    );
  }
}

export default App;
