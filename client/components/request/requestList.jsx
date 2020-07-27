import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import moment from 'moment';


import styles from './requestStyles.css';

// import RequestItem from './requestItem.jsx';

const RequestItem = (props =[]) => {
  const data = props.requests;

  const requestList = data.map( (req) =>
    {
      const timestamp = new Date(req.date);
      const newDate = moment(timestamp).format('MMMM Do YYYY');

      return (
        <div className={styles.post_box}>
          <span><h3> {req.title} </h3> <h5>{req.author}</h5> </span>
          <span><h4>{req.location}</h4> <h5>{newDate}</h5></span>
        </div>
      );
    });

  console.log('style: ', styles.post_box);
  return (
    <div className={styles.post_box}>
      {requestList}
    </div>
  );
}


class RequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
     };
  }

  componentDidMount() {
    axios.get('/getAllRequests')
      .then( (result) => {
        this.setState({
          requests : result.data.requests
        });
      })
      .catch();
  }




  render() {
    return (
      <RequestItem  className={styles.post_box} requests={this.state.requests} />
    );
  }
}


export default RequestList;
