import React from 'react';
import $ from 'jquery';
import axios from 'axios';



import RequestList from './request/RequestList.jsx';

import styles from './home/homeStyles.css';



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
    return (<button onClick={()=>{location.href = '/login';}} className={styles.menuButton_login} ></button>);
  }

  logoutButton () {
    return (<button onClick={()=> axios.post('/logoutProcess').then((res)=>this.setState({loggedin: false}))} className={styles.menuButton_logout} ></button>);
  }


  render() {

    return (
      <div className={`${styles.flex_stack} ${styles.body}`}>
        <div className={styles.banner}>
          {/* <img className={styles.bannerImage} src="https://helpinghands.s3.us-east-2.amazonaws.com/KakaoTalk_20200728_011343825.jpg" alt="image"/> */}
          <img className={styles.bannerImage} src="https://helpinghands.s3.us-east-2.amazonaws.com/KakaoTalk_20200728_074052399.png" alt="image"/>
        </div>

        <div className={styles.Menu_flex_box}>
          {/* <h4> Menu </h4> */}
          <div className={styles.Menu_content}>
            <div className={styles.flex_content}>
              <button className={styles.menuButton_request}></button>
            </div>
            <div className={styles.flex_content}>
              <button className={styles.menuButton_offer}></button>
            </div>

            <div className={styles.flex_content}>
              <button className={styles.menuButton_account}></button>
            </div>

          </div>
          <div className={styles.Menu_content} >

            <div className={styles.flex_empty}>
              <div className={styles.menuButton_empty}>
                <span className={styles.userDisplay}>
                  { (!this.state.loggedin) ?
                    "Please log-in to use full features" : `Username "${this.state.username}"`}
                </span>
              </div>
            </div>

            <div className={styles.flex_content}>
              { (!this.state.loggedin) ?
              this.loginButton() : this.logoutButton() }
            </div>

          </div>
          <div className={styles.flex_content} >

          </div>
        </div>
        <RequestList userInfo={this.state}/>
      </div>
    );
  }
}

export default App;
