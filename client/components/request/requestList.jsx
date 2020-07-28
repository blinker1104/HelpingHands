import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import moment from 'moment';
import ReactModal from 'react-modal';

import styles from './requestStyles.css';

// import RequestItem from './requestItem.jsx';
ReactModal.setAppElement('body')


const post_box = styles.post_box;

const flex_stack = styles.flex_stack;
const flex_content = styles.flex_content;



class NewRequestForm extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      title:'',
      body:'',
      contact:'',
      location:'',
      radius:''
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleOpenModal () {
    console.log('hello');
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }


  handleChange(event) {
    // event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    if(name === 'title') { this.setState({ 'title' : value }); }
    else if(name === 'body') { this.setState({ 'body' : value }); }
    else if(name === 'contact') { this.setState({ 'contact' : value }); }
    else if(name === 'location') { this.setState({ 'location' : value }); }
    else if(name === 'radius') { this.setState({ 'radius' : value }); }
    // console.log('new request form - update: ', name, value);
  }

  handleSubmit(event) {
    const newForm = {
      username: this.props.userInfo.username,
      title : this.state.title,
      body : this.state.body,
      contact : this.state.contact,
      location : this.state.location,
      radius : this.state.radius
    }
    axios.post('/newRequest', { newForm })
      .then( (res) => {
        console.log('Posting NEW REQUEST Completed', res);

        if (res.data.status) {
          this.setState({
            showModal: false,
            title:'',
            body:'',
            contact:'',
            location:'',
            radius:'1000'
          });
          this.props.updateFunc();
        }
      })
      .catch( (res) => {
        this.setState({warningMsg : 'Posting Failed' });
      });
    event.preventDefault();
  }



  render () {
    return (
      <div>
        { (this.props.userInfo.loggedin) ?
          <button onClick={this.handleOpenModal}>New Post</button> : ''
        }



        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="New Request Post"
        >

          <div className={styles.flex_content}>
            <h3>New Request</h3>

          </div>
          <h5>User : {this.props.userInfo.username}</h5>
          <form  onSubmit={this.handleSubmit}>

           <div className="flex_stack">
              <div className="flex_box">
                <label> Title </label>
              </div>
              <div className="flex_box">
                <input name="title" className={styles.flex_form} placeholder="Title" value={this.state.title} onChange={this.handleChange}></input>
              </div>

              <div className="flex_box">
                <label> Content </label>
              </div>
              <div className="flex_box">
                <textarea name="body" className={styles.textarea_simple} placeholder="Please specify your request here."  value={this.state.body} onChange={this.handleChange}></textarea>
              </div>

              <div className="flex_box">
                <label> Contact Info. </label>
              </div>
              <div className="flex_box">
                <textarea name="contact" className={styles.textarea_small} placeholder="How do you want other helpers to contact you? example: phone number or email"  value={this.state.contact} onChange={this.handleChange}></textarea>
              </div>



              <div className="flex_box">
                <label> Location (Optional) </label>
              </div>
              <div className="flex_box">
                <textarea name="location" className={styles.textarea_small} placeholder="Please type your approximate location. It is optional but it will allow your post to be visible to helpers in the nearby location. If you want your post to be visible to all, select 'remote available' in 'Searchable radius' "  value={this.state.location} onChange={this.handleChange}></textarea>
              </div>

              <div className="flex_box">
                <label> Searchable radius (approx. area) </label>
              </div>
              <div className="flex_box">
                <select name="radius"  onChange={this.handleChange}>
                  <option value ="1000"> remote available</option>
                  <option value ="0"> specific location</option>
                  <option value ="0.5"> 0.5 mile</option>
                  <option value ="1"> 1 mile</option>
                  <option value ="2"> 2 miles</option>
                  <option value ="5"> 5 miles</option>
                  <option value ="20"> 20 miles</option>
                  <option value ="50"> 50 miles</option>
                </select>
              </div>


              <div className="flex_box">
                <p>
                  Please check again before submitting your request form.
                </p>
              </div>

              <div>
                <button> Post this Request </button>
              </div>
            </div>
          </form>

          <button onClick={this.handleCloseModal}>Close</button>
        </ReactModal>
      </div>
    );
  }
}










const RequestItem = (props =[]) => {
  const data = props.requests;

  const requestList = data.map( (req) =>
    {
      const timestamp = new Date(req.date);
      const newDate = moment(timestamp).format('MMMM Do YYYY');

      return (
        <div className={post_box}>
          <span><h3> {req.title} </h3> <h5>{req.author}</h5> </span>
          <span><h4>{req.location}</h4> <h5>{newDate}</h5></span>
        </div>
      );
    });

  // console.log('style: ', styles.post_box);
  return (
    <div>
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
     this.updateList = this.updateList.bind(this);
  }

  componentDidMount() {
    this.updateList();
  }

  updateList () {
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
      <div id='RequestPosts'>
        <h4> Post </h4>
        {/* <button onClick={()=>console.log('new post')}> New Post </button> */}
        <NewRequestForm userInfo = {this.props.userInfo} updateFunc={this.updateList} />
        <RequestItem className={post_box} requests={this.state.requests} />
      </div>
    );
  }
}


export default RequestList;