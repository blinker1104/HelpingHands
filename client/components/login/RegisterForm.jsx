import React from 'react';
import axios from 'axios';

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      username: '',
      password: '',
      email: '',
      warningMsg: ''
    };
    this.startRegistration = this.startRegistration.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);

  }


  startRegistration() {

  }

  handleChange(event) {
    // event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    if(name === 'username') { this.setState({ 'username' : value }); }
    else if(name === 'password') { this.setState({ 'password' : value }); }
    else if(name === 'email') {
      // let emailFormat = /(\w+)@(\w+)/;
      // if (emailFormat.test(value)) {
      //   this.setState({ 'email' : value });
      // }
      this.setState({ 'email' : value });
    }
  }

  handleSubmit(event) {
    axios.post('/registrationFormSubmit', { newForm: this.state })
      .then( (res) => {
        console.log(res);
        if (res.data.status) {
          this.state.warningMsg = '';
          console.log('Register completed')
          this.props.changeView('RegisterComplete');
        } else {
          this.setState({warningMsg :`Registration failed - Try again`});
        }
      })
      .catch((err) => {
        this.setState({
          warningMsg :`Registration failed: ${err}`
        });
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
      <h3>Registration</h3>
        <form  onSubmit={this.handleSubmit}>
          <ul className="form-style-1">
            <li>
              <label> Username <span className="required">*</span></label>
              <input  type="text" name="username" className="field-long" placeholder="Username" value={this.state.username} onChange={this.handleChange}></input>
            </li>
            <li>
              <label> Password <span className="required">*</span></label>
              <input type="text" name="password" className="field-long" placeholder="Password"  value={this.state.password} onChange={this.handleChange}></input>
            </li>
            <li>
              <label> E-mail <span className="required">*</span></label>
              <input type="email"  name="email" className="field-long" value={this.state.email} onChange={this.handleChange} ></input>
            </li>
            <li>
              <p style={{color:"red"}}>
                {this.state.warningMsg}
              </p>
            </li>
            <li>
              <button >Register</button>
            </li>
          </ul>
        </form>
        <p>
          If you have an account, <br/>
          please login <br/>
          <button onClick={()=> this.props.changeView()}>Go to Login</button>
        </p>
      </div>
    );
  }
};

export default RegisterForm;