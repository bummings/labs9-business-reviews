import React, { Component } from 'react';
import Axios from 'axios';
import { backendLink } from '../assets/config';
import styled from 'styled-components';
import NavBar from './NavBar';

const StyledEdit = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 60px;

  label {
    margin-bottom: 6px;
    margin-right: 8px;
  }

  .review__input--title {
    width: 400px;
    height: 20px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 1.5rem;
  }
  .review__input--body {
    width: 400px;
    height: 200px;
    margin-bottom: 30px;
    padding: 10px;
    font-size: 1.5rem;
  }

  .review__rating {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .review__input--rating {
    width: 100px;
    font-size: 1.4rem;
    margin-right: 30px;
  }

  .review__rating {
    display: flex;
    align-items: center;
  }

  .btn {
    background-color: #eed974;
    height: 40px;
    width: 120px;
    margin-right: 20px;
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.19);
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    padding: 10px;
    margin-top: 35px;
    justify-content: center;
    border-radius: 5px;

    textarea {
      height: 200px;
      resize: none;
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    .container{
      display: flex;
      justify-content: center;
    }
    form {
      padding-top: 30px;
      background: white;
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: column wrap;
      flex-wrap: wrap;
      justify-content: center;
      h1 {
        width: 100%;
      }

      input {
        width: 400px;
        height: 20px;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 1.5rem;
      }

      textarea {
        width: 80%;
        height: 200px;
        border: 1px solid whitesmoke;
        margin-bottom: 15px;
        resize: none;
      }
    }
  }
`;

export default class EditReview extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      rating: 1
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { reviewId } = this.props.match.params;
    Axios.put(`${backendLink}/api/review/${reviewId}`, {
      title: this.state.title,
      body: this.state.body,
      rating: this.state.rating,
      reviewer_id: `${this.props.match.params.userId}`
    })
      .then(res => {
        console.log('Success!', res.status);
        this.setState({ title: '', body: '', rating: 1 });
      })
      .catch(err => console.log('error', err));
  };
  componentDidMount() {
    const { reviewId } = this.props.match.params;
    Axios.get(`${backendLink}/api/review/${reviewId}`)
      .then(res => this.setState(...res.data))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar/>
        <StyledEdit>
          <div className='container'>
            <form onSubmit={this.handleSubmit}>
              <h1 className='review__headline'>Edit your review</h1>
              <label htmlFor='review__title'>Title</label>
              <input
                onChange={this.changeHandler}
                name='title'
                value={this.state.title}
                className='review__input--title'
              />
              <label htmlFor='review__title'>Review</label>
              <textarea
                onChange={this.changeHandler}
                name='body'
                value={this.state.body}
                className='review__input--body'
              />
              <div className='review__rating'>
                <label htmlFor='review__input--rating'>Rating</label>
                <select
                  onChange={this.changeHandler}
                  name='rating'
                  value={this.state.rating}
                  className='review__input--rating'
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option defaultValue='5'>5</option>
                </select>
                <button className='btn' onClick={this.handleSubmit}>
                  Submit Review
                </button>
                <button className='btn' onClick={this.props.toggleReviewing}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </StyledEdit>
      </div>
      
    );
  }
}
