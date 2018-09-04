import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { api } from '../api'

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      date: ''
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleDateChange = (event) => {
    this.setState({ date: event.target.value });
  };

  getAjaxConfig = () => {
    const item = this.props.match.params.item;
    if (this.isMissionScreen()) {
      return {
        url: `${api.url}${item}`,
        params: {
          name: this.state.value,
          fechaHora: new Date(this.state.date).toISOString()
        }
      }
    }

    let user = 0;
    switch (item) {
      case 'sponsors':
        user = 1; break;
      case 'allies':
        user = 2; break;
      case 'teammates':
        user = 3; break;
      case 'saves':
        user = 4; break;
      case 'enemies':
        user = 5; break;
    }

    return {
      url: `${api.url}RegistroUsuarios`,
      params: {
        name: this.state.value,
        tpersona: user,
      }
    };
  }

  handleSubmit = (event) => {
    const that = this;
    const { url, params } = this.getAjaxConfig();
    axios.post(url, params).then((response) => {
      console.log(response);
      that.props.history.goBack();
    }).catch((error) => {
      console.log(error);
    });
    event.preventDefault();
  };

  isMissionScreen = () => {
    return this.props.match.params.item === 'mision';
  }

  renderFecha = () => {
    if (!this.isMissionScreen()) {
      return null;
    }
    return (
      <label>
        <input
          type="date"
          value={this.state.date}
          placeholder='Mission Date'
          onChange={this.handleDateChange} className='input' />
      </label>
    );
  }

  render() {
    const item = this.props.match.params.item;
    return (
      <div>
        <h1>Adding {item} Cap?</h1>
        <div>
          <div className='buttons-grp'>
            <div className='button'>
              <Link to={`/list/${this.props.match.params.item}`}><i
                className="fa fa-plane fa-rotate-180" /> Back to {this.props.match.params.item}</Link>
            </div>
          </div>
          <form className='add-item-form' onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.value}
                placeholder={`Add a new ${this.props.match.params.item}`}
                onChange={this.handleChange} className='input' />
            </label>
            {this.renderFecha()}
            <input type="submit" value="Submit" className='button submit' />
          </form>
        </div>
      </div>
    );
  }
}

export default AddItem;
