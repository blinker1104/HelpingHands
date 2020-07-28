import React from 'react';
import $ from 'jquery';
import axios from 'axios';



import RequestList from './request/RequestList.jsx';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <div>
          <h4> Menu </h4>
          { (!this.state.loggedin) ?
            "Please log-in to use full features" : `Logged in as User "${this.state.username}"`}

          { (!this.state.loggedin) ?
            this.loginButton() : this.logoutButton() }
        </div>
        <RequestList userInfo={this.state}/>
      </div>
    );
  }
}

export default App;
